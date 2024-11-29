import requests
import logging
from bs4 import BeautifulSoup
from tqdm import tqdm

from base_urls import BASE_URL


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
            departements_list.append(departement_title)
        return departements_list
    except Exception as scraping_error:
        logging.error(f"Error while scraping {h4} element : {scraping_error}")


def scrape_commissions(url: str) -> list[str]:
    logging.info(" -- Starting scraping commissions ")

    commissions_list = []

    try:
        response = requests.get(url)
    except Exception as request_error:
        logging.error(f"Error while requestions {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        divs = soup.find_all("div", class_="block-list--item-wrapper _colored")

        for div in tqdm(divs, desc="Scraping commissions infos", ncols=100, ascii=True):
            logo_element = div.find("img")
            name_element = div.find("span")
            objet_url = div.find_next_sibling("a")

            logo = logo_element.get("src")
            name = name_element.text
            objet = objet_url.get("href")

            try:
                res = requests.get(BASE_URL + objet)
                soup = BeautifulSoup(res.content, "html.parser", from_encoding="utf-8")
                objet = soup.find("h1").text
            except Exception as request_error:
                logging.error(f"Error while requesting {objet_url} : {request_error}")

            commission = {
                "name": name,
                "logo": BASE_URL + logo,
                "objet": objet,
            }
            commissions_list.append(commission)
        print(commissions_list)
        return commissions_list

    except Exception as scraping_error:
        logging.error(f"Error while scraping {div} : {scraping_error}")
