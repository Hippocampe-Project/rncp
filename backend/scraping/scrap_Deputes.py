# Scrapes the targeted data from Assemblée website

import requests
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#from unidecode import unidecode

driver = webdriver.Chrome()

# Set up logging configuration
# Function to scrape the href links of all sites from the specified URL

def scrape_political_groups(url):
    #logger.info('Starting scrape_sectors -- scraping href')
    political_groups_links = []

    response = requests.get(url)
    # print(response)
    if response.status_code == 200:

        soup = BeautifulSoup(response.content, "html.parser", from_encoding="utf-8")
        divs = soup.find_all("div", class_="block-list--item")

        for div in divs:
            for a in div.find_all("a"):
                href = a.get("href")
                political_groups_links.append(href)
        return political_groups_links
    
def scrape_party(political_groups: list) -> list:
    parties = []
    parti_president = []
    parties_members = []
    for party in political_groups:
        # response = requests.get(party)
        response = driver.get("party")
        if response.status_code == 200:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "ajax-wrapper"))
            )
            soup = BeautifulSoup(response.content, "html.parser")

            # scrape party name
            party_name = soup.h1.string
            parties.append(party_name)

            # scrape parties members and president
            for a in soup.find_all("a", class_="instance-composition-nom"):
                parties_members.append(a.string)
            
            test = soup.h3
            

    print(parties)
    print(parties_members)
    print(test)
    return parties



political_groups_links = scrape_political_groups("https://www.assemblee-nationale.fr/dyn/les-groupes-politiques")
scrape_party(political_groups_links)
# Function to construct URLs link for each site    

# Function to scrape each sites and retrieve its routes types

# Function to get the count of each route type in a site
