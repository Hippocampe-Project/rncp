""" Scrape the political parties currently represented in the Assembly, as well as their representatives and their information """

import time
import os
import re
import typing

import requests
from bs4 import BeautifulSoup

from logging_utils import info_logger, error_logger

if typing.TYPE_CHECKING:
    from chrome_driver_handler import ChromeDriverHandler

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


base_url = "https://www2.assemblee-nationale.fr"


def scrape_political_parties_urls(url: str) -> list[str]:
    info_logger.info(" -- Starting scraping political groups urls")

    political_groups_links = []

    try:
        response = requests.get(url)
    except Exception as request_error:
        error_logger.error(f"Error while requesting {url} : {request_error}")

    try:
        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        divs = soup.find_all("div", class_="block-list--item")

        for div in divs:
            for a in div.find_all("a"):
                href = a.get("href")
                political_groups_links.append(href)
        # print(political_groups_links)
        return political_groups_links
    except Exception as scraping_error:
        error_logger.error(f"Error while scraping {url} page : {scraping_error}")


def scrape_representatives_personal_page_url(
    driver_handler: "ChromeDriverHandler",
    political_groups: list[str],
) -> list[dict]:

    info_logger.info(" -- Starting scraping each political group page")

    driver = driver_handler.get_driver()

    parties = []
    representatives_urls = []

    info_logger.info(
        "Scraping each political group name and president \n Scraping all representatives personal page url + some infos"
    )
    for party in political_groups:

        try:
            driver.get(party)

            try:
                ajax_element = WebDriverWait(driver, 20).until(
                    EC.visibility_of_element_located(
                        (By.ID, "instance-composition-list")
                    )
                )
            except TimeoutException as timeout:
                print(
                    f"Timeout waiting for AJAX content to load for {party} : {timeout}"
                )
                # raise/break

            page_source = driver.page_source
            soup = BeautifulSoup(page_source, "html.parser")

            try:
                political_group = soup.h1.text
                president_section = soup.find(
                    "h3", string=re.compile(r"Présente|Président")
                )
                if president_section is not None:
                    president_name = president_section.find_next(
                        "a", class_="instance-composition-nom"
                    ).text
                    party_infos = {
                        "party_name": political_group,
                        president_section.text: president_name.replace("\xa0", " "),
                    }
                    print(party_infos)
                    parties.append(party_infos)
            except Exception as scraping_error:
                print(f"Error scraping political group or president: {scraping_error}")

            try:
                representatives_section = soup.find("h3", string="Membres")

                if representatives_section:
                    representatives_list = representatives_section.find_next_sibling(
                        "ul"
                    )
                    if representatives_list:
                        representatives = representatives_list.find_all("li")

                    for representative in representatives:
                        representative_picture = base_url + representative.find(
                            "img"
                        ).get("src")
                        representative_location = representative.find(
                            "span", class_="instance-composition-circonscription"
                        ).text.strip()
                        representative_commision = representative.find(
                            "a", class_="instance-composition-commission"
                        ).text
                        representative_personal_page_url = (
                            base_url
                            + representative.find(
                                "a", class_="instance-composition-nom"
                            ).get("href")
                        )
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
                print(
                    f"Error scraping representatives for party {party}: {scraping_error}"
                )

        except Exception as driver_error:
            print(f"An error occured while requesting {party} : {driver_error}")

    driver_handler.quit_driver()

    return parties, representatives_urls
