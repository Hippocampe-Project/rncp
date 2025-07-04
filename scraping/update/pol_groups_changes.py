"""Scrape the political group modification web page to see if deputes table update is necessary"""

import requests
from bs4 import BeautifulSoup
import logging
from datetime import datetime

from scrape_utils import format_date
from config_urls import POL_GROUP_CHANGES


def scrape_last_groupe_composition_change(
    url: str = POL_GROUP_CHANGES,
) -> datetime:  # format : 13-02-2025
    logging.info(" Starting scraping last groupe change date")

    try:
        response = requests.get(url)
    except Exception as request_error:
        logging.error(f"Error while requestions {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        year_div = soup.find("div", class_="interieur")
        last_entry = year_div.find_next("b").text
        last_modification_date = " ".join(last_entry.split()[:3])
        return format_date(last_modification_date)
    except Exception as scraping_error:
        logging.error(f"Error while scraping element : {scraping_error}")
