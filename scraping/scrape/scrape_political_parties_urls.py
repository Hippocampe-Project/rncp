""" Scrape the political parties currently represented in the Assembly, as well as their representatives and their information """

import logging
import requests
from bs4 import BeautifulSoup


def scrape_political_parties_urls(url: str) -> list[str]:
    logging.info(" -- Starting scraping political groups urls")

    political_groups_links = []

    try:
        response = requests.get(url)
    except Exception as request_error:
        logging.error(f"Error while requesting {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        divs = soup.find_all("div", class_="block-list--item")

        for div in divs:
            for a in div.find_all("a"):
                href = a.get("href")
                political_groups_links.append(href)

        return political_groups_links

    except Exception as scraping_error:
        logging.warning(f"Error while scraping {div} element : {scraping_error}")
