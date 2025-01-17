import os
import time
import logging

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)d] - %(message)s",
)

from config_urls import (
    POLITICAL_GROUPS_URLS,
    COMMISSIONS_URL,
    DEPARTEMENTS_URLS,
    RECORDED_VOTE_URL,
)
from chrome_driver_handler import ChromeDriverHandler
from scrape.scrape_political_parties_urls import scrape_political_parties_urls
from scrape.scrape_representatives import scrape_every_representative
from scrape.scrape_permanent_infos import scrape_departements, scrape_commissions
from scrape.scrape_each_political_group_page import scrape_each_political_group_page
from scrape.scrape_votes import scrape_all_votes_urls, scrape_each_vote
from database.db_insertions import (
    first_scraping_database_insertion,
    second_scraping_database_insertion,
)
from scrape_utils import sort_votes_by_date

# Access the environment variables
chrome_bin = os.getenv("CHROME_BIN")
chrome_driver = os.getenv("CHROME_DRIVER")

# departements, permanent commissions, political parties, representatives
first_scraping = False
# votes
second_scraping = True
database_insertion = False


def main():

    logging.info(" -- Starting main() function --")
    start_time = time.time()

    logging.info(" - Starting scraping - ")
    start_scraping = time.time()

    driver_handler = ChromeDriverHandler(chrome_bin, chrome_driver)

    if first_scraping:

        departements_table = scrape_departements(DEPARTEMENTS_URLS)
        logging.info(departements_table)

        commissions_table = scrape_commissions(COMMISSIONS_URL)
        logging.info(commissions_table)

        political_groups_links = scrape_political_parties_urls(POLITICAL_GROUPS_URLS)
        parties_table, all_representatives_urls = scrape_each_political_group_page(
            driver_handler, political_groups_links
        )
        logging.info(parties_table)

        representatives_table = scrape_every_representative(all_representatives_urls)
        logging.info(representatives_table)

    if second_scraping:
        all_votes_pages_urls = scrape_all_votes_urls(driver_handler, RECORDED_VOTE_URL)
        all_votes_data = scrape_each_vote(all_votes_pages_urls)
        all_votes_infos_sorted = sort_votes_by_date(all_votes_data)
        logging.info(f"all votes length : {len(all_votes_infos_sorted)}")

    end_scraping = time.time()
    logging.info(f" ~ Scraping execution time : {start_scraping - end_scraping} ~ ")

    logging.info(" - Starting database insertion - ")
    start_db_insertion = time.time()

    if first_scraping and database_insertion:
        first_scraping_database_insertion(
            departements_table, commissions_table, parties_table, representatives_table
        )

    if second_scraping and database_insertion:
        second_scraping_database_insertion()

    end_db_insertion = time.time()
    logging.info(
        f" ~ Database insertion execution time : {start_db_insertion - end_db_insertion} ~ "
    )

    end_time = time.time()
    logging.info(f" ~ Execution time : {end_time - start_time} ~ ")

    logging.info(" -- Exiting main() function --")


if __name__ == "__main__":
    main()
