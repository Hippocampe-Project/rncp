import os
import time
import logging


from logging_utils import info_logger, error_logger
from base_urls import POLITICAL_GROUPS_URLS, COMMISSIONS_URL, DEPARTEMENTS_URLS
from chrome_driver_handler import ChromeDriverHandler
from get_web_page_urls import (
    scrape_political_parties_urls,
    scrape_representatives_personal_page_url,
)
from scrape_representatives import scrape_every_representative
from scrape_permanent_infos import scrape_departements, scrape_commissions

# Access the environment variables
chrome_bin = os.getenv("CHROME_BIN")
chrome_driver = os.getenv("CHROME_DRIVER")


def main():

    info_logger.info(" -- Starting main() function --")

    start_time = time.time()

    driver_handler = ChromeDriverHandler(chrome_bin, chrome_driver)

    departements_table = scrape_departements(DEPARTEMENTS_URLS)
    logging.info(departements_table)

    commissions_table = scrape_commissions(COMMISSIONS_URL)
    logging.info(commissions_table)

    political_groups_links = scrape_political_parties_urls(POLITICAL_GROUPS_URLS)
    parties_table, all_representatives_urls = scrape_representatives_personal_page_url(
        driver_handler, political_groups_links
    )
    logging.info(parties_table)

    representatives_table = scrape_every_representative(all_representatives_urls)
    logging.info(representatives_table)

    end_time = time.time()
    logging.info(f" ~ Execution time : {end_time - start_time} ~ ")

    logging.info(" -- Exiting main() function --")


if __name__ == "__main__":

    main()
