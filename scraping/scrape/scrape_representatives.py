import logging
import requests
from bs4 import BeautifulSoup
import re
import sys
import signal
from tqdm import tqdm
import concurrent.futures
from scrape.scrape_models import Representative


def scrape_representative_page(representative_infos) -> dict:

    try:
        response = requests.get(representative_infos["url"])
    except Exception as request_error:
        logging.error(
            f"Error while requesting {representative_infos["url"]} : {request_error}"
        )

    try:

        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")

        name = soup.h1.text.split(" ", 1)[1]
        gender = soup.h1.text.split(" ", 1)[0]
        political_group = soup.find("a", class_="h4 _colored link").text.strip()
        sectors = representative_infos["departement_and_circonscription"].split()
        departement = sectors[0]
        circonscription = sectors[1]
        commission = representative_infos["commission"]
        biographical_elements = soup.find_all("span", class_="h5 _colored-deputes")
        birth_date, profession, substitute = scrape_representative_bio(
            biographical_elements, name
        )
        picture = representative_infos["picture"]

        representative = Representative(
            name=name,
            gender=gender,
            birth_date=birth_date,
            department=departement,
            circonscription=circonscription,
            commission=commission,
            profession=profession,
            substitute=substitute,
            political_group=political_group,
            picture=picture,
            active=True,
        )

    except Exception as scraping_error:
        logging.warning(f"Error while scraping {name} personal page : {scraping_error}")

    return representative.to_dict()


def scrape_representative_bio(biography, name):
    try:
        substitute = None
        for bio in biography:
            if bio.text == "Biographie":
                text = bio.find_next("p").text
                matches = list(re.finditer(r"[)-]", text))
                if matches:
                    last_match = matches[-1]
                    index = last_match.start()
                    birth_date = text[:index].strip()
                    profession = text[index + 1 :].strip()
            if bio.text == "Suppléant":
                substitute = bio.find_next("span").text
        return birth_date, profession, substitute
    except Exception as scraping_error:
        logging.warning(f"Error while scraping the bio of {name} : {scraping_error}")


def scrape_each_representative(
    representatives_infos: list[dict], max_threads: int = 10
) -> list[dict]:

    logging.info(" -- Starting scraping each representative personal page ")

    representatives_table = []

    def signal_handler(sig, frame):
        logging.error("Process interrupted, cleaning up threads...")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    try:
        with concurrent.futures.ThreadPoolExecutor(max_threads) as executor:

            future_to_url = {
                executor.submit(
                    scrape_representative_page, representative_infos
                ): representative_infos
                for representative_infos in representatives_infos
            }

            for future in tqdm(
                concurrent.futures.as_completed(future_to_url),
                total=len(representatives_infos),
                desc="Scraping each representative page",
                ncols=100,
                ascii=True,
            ):
                try:
                    result = future.result()
                    if result:
                        representatives_table.append(result)
                except Exception as e:
                    logging.error(f"Error processing a representative page: {e}")
                    sys.exit(1)

    except KeyboardInterrupt:
        logging.warning("Process interrupted, cleaning up and exiting")
        sys.exit(0)

    return representatives_table


# TEST
# test_list = [
#     {
#         "url": "https://www.assemblee-nationale.fr/dyn/deputes/PA722046",
#         "commission": "Défense",
#         "departement_and_circonscription": "Haute-Loire (1)",
#         "picture": "some_image",
#     }
# ]

# scrape_every_representative(test_list)
