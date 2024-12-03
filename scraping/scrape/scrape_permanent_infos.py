import requests
import logging
from bs4 import BeautifulSoup
from tqdm import tqdm

from config_urls import BASE_URL
from scrape_models import Departement, StandingCommittees


def scrape_departements(url: str) -> list[str]:
    logging.info(" -- Starting scraping departements ")

    departements_list = []

    try:
        response = requests.get(url)
    except Exception as request_error:
        logging.error(f"Error while requestions {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        h4_list = soup.find_all("h4")
        for h4 in tqdm(h4_list, desc="Scraping departemens", ncols=100, ascii=True):
            departement_title = h4.text
            departement = Departement(name=departement_title)
            departements_list.append(departement.to_dict())
        return departements_list
    except Exception as scraping_error:
        logging.error(f"Error while scraping {h4} element : {scraping_error}")


def scrape_commissions(url: str) -> list[str]:
    logging.info(" -- Starting scraping commissions ")

    commissions_list = []

    try:
        response = requests.get(url)
    except Exception as request_error:
        logging.error(f"Error while requesting {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        divs = soup.find_all("div", class_="block-list--item-wrapper _colored")

        for div in tqdm(divs, desc="Scraping commissions infos", ncols=100, ascii=True):
            logo_element = div.find("img")
            name_element = div.find("span")
            mission_element = div.find_next_sibling("a")

            logo = logo_element.get("src")
            name = name_element.text
            mission_url = mission_element.get("href")

            try:
                res = requests.get(BASE_URL + mission_url)
                soup = BeautifulSoup(res.content, "html.parser", from_encoding="utf-8")
                mission = soup.find("h1").text
            except Exception as request_error:
                logging.error(f"Error while requesting {res} : {request_error}")

            commission = StandingCommittees(name=name, mission=mission, logo=logo)

            commissions_list.append(commission.to_dict())

        return commissions_list

    except Exception as scraping_error:
        logging.warning(f"Error while scraping {div} : {scraping_error}")
