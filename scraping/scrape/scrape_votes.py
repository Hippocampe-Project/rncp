import logging
from tqdm import tqdm
import sys
import typing
import re
import requests
from bs4 import BeautifulSoup
import concurrent.futures
import signal

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


if typing.TYPE_CHECKING:
    from chrome_driver_handler import ChromeDriverHandler

from config_urls import BASE_URL, LAST_SCRAPED_VOTE_FILE
from scrape.scrape_models import Bill, Vote
from scrape_utils import load_json

# TEST import
# BASE_URL = "https://www2.assemblee-nationale.fr"
# from scrape_models import Bill, Vote


def scrape_all_votes_urls(
    driver_handler: "ChromeDriverHandler", url: str, updating=False
) -> list[str]:
    """votes update logic is inside the main votes scraping function because
    we know for a fact that votes are updated weekly. So it's basically inherent
    to this function to be a scraping updater. We only make the updating optional
    to be able to rely on the possibility to scrape again all votes if ever the need.
    """
    logging.info(" -- Starting scraping votes ulrs ")

    if updating:
        logging.info("Updating votes, retrieving last vote number")
        last_vote = load_json(LAST_SCRAPED_VOTE_FILE)
        last_vote_number = last_vote.get("last_scraped_vote")
        logging.info(f"Last scraped vote number : {last_vote_number}")

    driver = driver_handler.get_driver()

    votes_urls = []

    try:
        driver.get(url)
    except Exception as request_error:
        logging.error(f"An error occured while requesting {url} : {request_error} ")

    page = 1
    while True:

        try:
            logging.info(f"page: {page}")
            # Scrape all votes web page urls from current page
            current_url = driver.current_url
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")
            all_votes = soup.find_all("a", class_="link h6")
            for vote in all_votes:
                vote_url = vote.get("href")

                if updating:
                    # Regex to capture digits after the last '/' in the url
                    pattern = r"/(\d+)$"
                    match = re.search(pattern, vote_url)
                    vote_number = int(match.group(1))
                    if last_vote_number == vote_number:
                        logging.info(
                            f"last vote number: {last_vote_number} == current vote number: {vote_number} --> breaking the scraping of votes urls."
                        )
                        return

                votes_urls.append(BASE_URL + vote_url)

        except Exception as scraping_error:
            logging.error(
                f"An error occured while scraping votes urls : {scraping_error}"
            )
            sys.exit(1)

        try:

            next_page_button = driver.find_elements(
                By.CSS_SELECTOR, ".an-pagination--item.trigger.next a.inner"
            )

            if len(next_page_button) == 0:
                logging.info("No next page button found. Breaking the loop.")
                break

            # Click on next page button
            driver.execute_script("arguments[0].click();", next_page_button[0])

            page += 1

        except Exception as click_error:
            logging.error(
                f"An errror occured while trying to click on next page button : {click_error}"
            )
            sys.exit(1)

    return votes_urls


def get_num_of_votes(soup, span_class: str) -> str:
    span_element = soup.find("span", class_=span_class)
    if not span_element:
        return 0
    b_element = span_element.find_next("b")
    return b_element.get_text(strip=True)


def get_vote_adoption_status(soup):

    def get_text_from_span(class_name):
        element = soup.find("span", class_=class_name)
        return element.get_text(strip=True) if element else None

    check_for_rejected_text = get_text_from_span("_colored-red")
    check_for_adopted_text = get_text_from_span("_colored-green _bold")

    return check_for_adopted_text or check_for_rejected_text


def scrape_vote_page(vote_page_url: str) -> dict:

    for_voters: list = []
    against_voters: list = []
    abstention_voters: list = []
    non_voters: list = []

    vote_categories_targets = [
        "h6 _colored-travaux",
        "h6 _colored-fadered",
        "h6 _colored-grey",
    ]

    try:
        response = requests.get(vote_page_url)
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
    except Exception as request_error:
        logging.error(
            f"An error occured while requesting vote page {vote_page_url} : {request_error} "
        )

    try:
        # Scrape general vote infos
        date = soup.h2.text
        title = soup.find("p", class_="h6 _colored").get_text(strip=True)
        vote_list = soup.find("ul", class_="votes-list")
        if vote_list:
            num_of_voters = get_num_of_votes(soup, "_colored-primary")
            num_of_for = get_num_of_votes(soup, "_colored-travaux")
            num_of_against = get_num_of_votes(soup, "_colored-fadered")
            num_of_abstention = get_num_of_votes(soup, "_colored-grey")
        else:
            num_of_for = get_num_of_votes(soup, "_colored-primary")
            num_of_voters = num_of_for
            num_of_against = 0
            num_of_abstention = 0

        vote_adoption_status = get_vote_adoption_status(soup)

        # Scrape voters detail
        cate = 1
        for cat in vote_categories_targets:
            vote_type = soup.find_all("span", class_=cat)
            for el in vote_type:
                ul_element = el.find_parent("div").find_next_sibling("ul")
                a_elements = ul_element.find_all("a", class_="link _small")
                for a in a_elements:
                    raw_voter_name = a.get_text(strip=True)
                    voter_name = raw_voter_name.replace("Mme ", "").replace("M. ", "")
                    if cat == "h6 _colored-travaux":
                        for_voters.append(voter_name)
                    elif cat == "h6 _colored-fadered":
                        against_voters.append(voter_name)
                    elif cat == "h6 _colored-grey":
                        next_element = a.find_next_sibling()
                        if next_element and next_element.name == "div":
                            non_voters.append(voter_name)
                        else:
                            abstention_voters.append(voter_name)
            cate += 1

    except Exception as scrapin_error:
        logging.error(
            f"An error occured while scraping vote page {vote_page_url} : {scrapin_error} "
        )
    vote = Vote(
        title=title,
        legislative_file=None,
        date=date,
        num_voters=num_of_voters,
        num_for=num_of_for,
        num_against=num_of_against,
        num_abstention=num_of_abstention,
        vote_adoption_status=vote_adoption_status,
        for_voters=for_voters,
        against_voters=against_voters,
        abstention_voters=abstention_voters,
        non_voters=non_voters,
    )
    return vote.to_dict()


def scrape_each_vote(votes_urls: list[str], max_threads: int = 10) -> list[dict]:
    logging.info(" -- Starting scraping each vote page")

    votes_infos = []

    def signal_handler(sig, frame):
        logging.error("Process interrupted, cleaning up threads...")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    try:
        with concurrent.futures.ThreadPoolExecutor(max_threads) as executor:

            future_to_url = {
                executor.submit(scrape_vote_page, url): url for url in votes_urls
            }

            for future in tqdm(
                concurrent.futures.as_completed(future_to_url),
                total=len(votes_urls),
                desc="Scraping each vote page",
                ncols=100,
                ascii=True,
            ):
                try:
                    result = future.result()
                    if result:
                        votes_infos.append(result)
                except Exception as e:
                    logging.error(f"Error processing a vote page: {e}")
                    sys.exit(1)

    except KeyboardInterrupt:
        logging.warning("Process interrupted, cleaning up and exiting.")
        sys.exit(0)

    return votes_infos


# TEST
# data = scrape_vote_page("https://www.assemblee-nationale.fr/dyn/17/scrutins/526")
# print(data)
