import os

from dotenv import load_dotenv

load_dotenv()

# PATHS
LAST_SCRAPED_VOTE_FILE = os.getenv("LAST_SCRAPED_VOTE_FILE")
LAST_SCRAPING_INFOS = os.getenv("LAST_SCRAPING_INFOS")
LAST_SCRAPED_DEPUTES_FILE = os.getenv("LAST_SCRAPED_DEPUTES_FILE")
LOGS_PATH = os.getenv("LOGS_PATH")

# LOCAL
CHROME_BIN = os.getenv("CHROME_BIN")
CHROME_DRIVER = os.getenv("CHROME_DRIVER")
