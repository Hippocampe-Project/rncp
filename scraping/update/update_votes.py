import requests
import logging
from bs4 import BeautifulSoup
from config_urls import BASE_URL
from scrape.scrape_models import Departement, Commissions

from scrape.scrape_votes import scrape_vote_page
