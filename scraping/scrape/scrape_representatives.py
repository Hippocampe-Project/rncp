import logging
import requests
from bs4 import BeautifulSoup
import re
from tqdm import tqdm
from scrape.scrape_models import Representative


def scrape_every_representative(representatives_infos: list[dict]) -> list[dict]:

    logging.info(" -- Starting scraping each representative personal page ")

    representatives_table = []

    for dict in tqdm(representatives_infos, desc="Scraping representatives", ncols=100, ascii=True):

        try:
            response = requests.get(dict["url"])
        except Exception as request_error:
            logging.error(f"Error while requesting {dict["url"]} : {request_error}")

        try:

            soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")

            name = soup.h1.text.split(" ", 1)[1]
            gender = soup.h1.text.split(" ", 1)[0]
            political_group = soup.find("a", class_="h4 _colored link").text.strip()
            sectors = dict["departement_and_circonscription"].split()
            departement = sectors[0]
            circonscription = sectors[1]
            commission = dict["commission"]
            biographical_elements = soup.find_all("span", class_="h5 _colored-deputes")
            birth_date, profession, substitute = scrape_representative_bio(biographical_elements, name)
            picture = dict["picture"]
            
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

            representatives_table.append(representative.to_dict())

        except Exception as scraping_error:
            logging.warning(f"Error while scraping {name} personal page : {scraping_error}")
            
    return representatives_table

def scrape_representative_bio(biography, name):
    try:
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
            else:
                substitute = "None"
        return birth_date, profession, substitute
    except Exception as scraping_error:
        logging.warning(f"Error while scraping the bio of {name} : {scraping_error}")


# TEST
test_list = [
    {
        "url": "https://www.assemblee-nationale.fr/dyn/deputes/PA795962",
        "commission": "Défense",
        "departement_and_circonscription": "Haute-Loire (1)",
        "picture": "some_image",
    }
]

scrape_every_representative(test_list)
