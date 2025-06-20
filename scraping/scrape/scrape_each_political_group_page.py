import logging
from tqdm import tqdm
import typing
import sys
import re
from bs4 import BeautifulSoup

if typing.TYPE_CHECKING:
    from chrome_driver_handler import ChromeDriverHandler

from error_handler import custom_exit
from scrape.scrape_models import PoliticalGroup
from globals.config_urls import BASE_URL

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


def scrape_each_political_group_page(
    driver_handler: "ChromeDriverHandler",
    political_groups: list[str],
) -> list[dict]:

    logging.info(" -- Starting scraping each political group page")

    driver = driver_handler.get_driver()

    parties = []
    representatives_urls = []

    logging.info(
        "Scraping each political group name and president \n Scraping all representatives personal page url + some infos"
    )

    for party in tqdm(
        political_groups,
        desc="Scraping political groups and representatives urls",
        ncols=100,
        ascii=True,
    ):

        try:
            driver.get(party)

            try:
                ajax_element = WebDriverWait(driver, 20).until(
                    EC.visibility_of_element_located(
                        (By.ID, "instance-composition-list")
                    )
                )
            except TimeoutException as timeout:
                logging.error(
                    f"Timeout waiting for AJAX content to load for {party} : {timeout}"
                )
                custom_exit(
                    "Timeout waiting for AJAX content inside political group page"
                )

            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")

            scrape_political_group(soup, parties)
            scrape_some_representative_infos(soup, representatives_urls, party)

        except Exception as driver_error:
            logging.error(f"An error occured while requesting {party} : {driver_error}")

    driver_handler.quit_driver()

    return parties, representatives_urls


def scrape_political_group(soup, parties: list):
    try:
        political_group = soup.h1.text
        president_section = soup.find("h3", string=re.compile(r"Présente|Président"))
        if president_section is not None:
            president_name = president_section.find_next(
                "a", class_="instance-composition-nom"
            ).text
            party_infos = PoliticalGroup(
                name=political_group,
                president=president_name,
                title=president_section.text,
            )
            parties.append(party_infos.to_dict())
    except Exception as scraping_error:
        logging.warning(
            f"Error scraping political group {political_group} : {scraping_error}"
        )


def scrape_some_representative_infos(soup, representatives_urls: list, party):
    try:
        representatives_section = soup.find("h3", string="Membres")

        if representatives_section:
            representatives_list = representatives_section.find_next_sibling("ul")
            if representatives_list:
                representatives = representatives_list.find_all("li")

            for representative in representatives:
                representative_picture = BASE_URL + representative.find("img").get(
                    "src"
                )
                representative_location = representative.find(
                    "span", class_="instance-composition-circonscription"
                ).text.strip()
                representative_commision = representative.find(
                    "a", class_="instance-composition-commission"
                ).text
                representative_personal_page_url = BASE_URL + representative.find(
                    "a", class_="instance-composition-nom"
                ).get("href")
                representative_infos = {
                    "picture": representative_picture,
                    "departement_and_circonscription": representative_location.replace(
                        "\xa0", " "
                    ),
                    "commission": representative_commision,
                    "url": representative_personal_page_url,
                }
                representatives_urls.append(representative_infos)

    except Exception as scraping_error:
        logging.warning(
            f"Error scraping representative {representative} for party {party} : {scraping_error}"
        )


# TEST
# from chrome_driver_handler import ChromeDriverHandler
# import os
# chrome_bin = os.getenv("CHROME_BIN")
# chrome_driver = os.getenv("CHROME_DRIVER")
# driver_handler = ChromeDriverHandler(chrome_bin, chrome_driver)
# scrape_representatives_personal_page_url(
#     driver_handler,
#     [
#         "https://www2.assemblee-nationale.fr/17/les-groupes-politiques/rassemblement-national"
#     ],
# )
