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

# DATABASE
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# EMAIL ALERT
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
EMAIL_SENDER = os.getenv("EMAIL")
EMAIL_RECEIVER = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("APP_PASSWORD")
