import requests
from bs4 import BeautifulSoup
import re
from logging_utils import info_logger, error_logger
from data_strucures import Representative


def scrape_every_representative(representatives_infos: list[dict]) -> list[dict]:

    info_logger.info(" -- Starting scraping each representative personal page ")

    # TODO : append representativ to a list that you return

    for dict in representatives_infos:

        try:
            response = requests.get(dict["url"])
        except Exception as request_error:
            error_logger.error(f"Error while requesting {dict["url"]} : {request_error}")

        try:

            soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")

            # Get raw data
            name = soup.h1.text.split(" ", 1)[1]
            gender = soup.h1.text.split(" ", 1)[0]
            political_group = soup.find("a", class_="h4 _colored link").text.strip()
            sectors = dict["departement_and_circonscription"].split()
            departement = sectors[0]
            circonscription = sectors[1]
            commission = dict["commission"]
            biographical_elements = soup.find_all("span", class_="h5 _colored-deputes")
            for bio in biographical_elements:
                if bio.text == "Biographie":
                    text = bio.find_next("p").text
                    matches = list(re.finditer(r"[)-]", text))
                    if matches:
                        last_match = matches[-1]
                        index = last_match.start()
                        birth_date = text[:index].strip()
                        profession = text[index + 1 :].strip()
                elif bio.text == "Suppléant":
                    substitute = bio.find_next("span").text
            picture = dict["picture"]

            # print(
            #     name,
            #     gender,
            #     political_group,
            #     departement,
            #     circonscription,
            #     commission,
            #     birth_date,
            #     profession,
            #     substitute,
            #     picture,
            # )

            # Construct representative class instance
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
            )

            # print(representative)
            return representative
        
        except Exception as scraping_error:
            error_logger.error(f"Error while scraping {name} personal page : {scraping_error}")
            

# TEST
# test_list = [
#     {
#         "url": "https://www.assemblee-nationale.fr/dyn/deputes/PA796118",
#         "commission": "Défense",
#         "departement_and_circonscription": "Haute-Loire 1",
#         "image": "some_image",
#     }
# ]

# scrape_every_representative(test_list)
