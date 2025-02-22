import os
from datetime import datetime, time
import time
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)d] - %(message)s",
)

from config_urls import (
    POLITICAL_GROUPS_URLS,
    COMMISSIONS_URL,
    DEPARTEMENTS_URLS,
    RECORDED_VOTE_URL,
    LAST_SCRAPED_VOTE_FILE,
    LAST_SCRAPING_INFOS,
    LAST_SCRAPED_DEPUTES_FILE,
)

from chrome_driver_handler import ChromeDriverHandler
from scrape.scrape_political_parties_urls import scrape_political_parties_urls
from scrape.scrape_representatives import scrape_each_representative
from scrape.scrape_permanent_infos import scrape_departements, scrape_commissions
from scrape.scrape_each_political_group_page import scrape_each_political_group_page
from scrape.scrape_votes import scrape_all_votes_urls, scrape_each_vote
from database.db_insertions import (
    pol_groups_and_deputes_database_insertion,
    votes_database_insertion,
    update_deputes_database_table,
    permanent_infos_database_insertion,
)
from scrape_utils import sort_votes_by_vote_number, save_json, load_json
from update.should_update import should_update_deputes
from database.db_operations import HandleDatabase

# Access the environment variables
chrome_bin = os.getenv("CHROME_BIN")
chrome_driver = os.getenv("CHROME_DRIVER")

format_date = datetime.now().strftime("%d-%m-%Y")
today_date = datetime.strptime(format_date, "%d-%m-%Y")

# Scraping configuration
permanent_infos = False
scrape_pol_groups_and_deputes = False
scrape_votes = False
database_insertion = False
updating_votes = False
updating_deputes = False


def main():

    logging.info(" -- Starting main() function --")
    start_time = time.time()

    logging.info(" - Starting scraping - ")
    start_scraping = time.time()

    driver_handler = ChromeDriverHandler(chrome_bin, chrome_driver)

    # fmt: off
    scrape_pol_groups_and_deputes = database_insertion = updating_deputes = should_update_deputes(LAST_SCRAPED_DEPUTES_FILE)
    # fmt: on

    if permanent_infos:

        departements_table = scrape_departements(DEPARTEMENTS_URLS)
        logging.info(departements_table)

        commissions_table = scrape_commissions(COMMISSIONS_URL)
        logging.info(commissions_table)

    if scrape_pol_groups_and_deputes:

        political_groups_links = scrape_political_parties_urls(POLITICAL_GROUPS_URLS)
        parties_table, all_representatives_urls = scrape_each_political_group_page(
            driver_handler, political_groups_links
        )
        logging.info(parties_table)

        representatives_table = scrape_each_representative(all_representatives_urls)
        logging.info(representatives_table)

    if scrape_votes:
        if updating_votes:
            all_votes_pages_urls = scrape_all_votes_urls(
                driver_handler, RECORDED_VOTE_URL, updating=True
            )
        else:
            all_votes_pages_urls = scrape_all_votes_urls(
                driver_handler, RECORDED_VOTE_URL
            )
        if (
            len(all_votes_pages_urls) == 0
        ):  # sometimes scraping fail to retrieve any urls fo r unknown reason for some times
            sys.exit(1)
        all_votes_data = scrape_each_vote(all_votes_pages_urls)
        all_votes_infos_sorted = sort_votes_by_vote_number(all_votes_data)
        logging.info(f"all votes length : {len(all_votes_infos_sorted)}")

    end_scraping = time.time()
    logging.info(f" ~ Scraping execution time : {start_scraping - end_scraping} ~ ")

    if database_insertion:
        logging.info(" - Starting database insertion - ")
        start_db_insertion = time.time()

        db = HandleDatabase()
        vote_update_success = None
        deputes_update_success = None

        if permanent_infos:
            permanent_infos_database_insertion(
                db, departements_table, commissions_table
            )

        if updating_deputes:
            update_deputes_database_table(db, representatives_table)
            if db.query_success == True:
                save_json(
                    {"last_scraped_deputes": format_date}, LAST_SCRAPED_DEPUTES_FILE
                )
                deputes_update_success = True
        elif scrape_pol_groups_and_deputes:
            pol_groups_and_deputes_database_insertion(
                db,
                parties_table,
                representatives_table,
            )
            if db.query_success == True:
                save_json(
                    {"last_scraped_deputes": format_date}, LAST_SCRAPED_DEPUTES_FILE
                )
                deputes_update_success = True

        if scrape_votes:
            votes_database_insertion(db, all_votes_infos_sorted)
            if db.query_success == True:
                save_json(
                    {"last_scraped_vote": all_votes_infos_sorted[0]["numero_vote"]},
                    LAST_SCRAPED_VOTE_FILE,
                )
                vote_update_success = True

        end_db_insertion = time.time()
        logging.info(
            f" ~ Database insertion execution time : {start_db_insertion - end_db_insertion} ~ "
        )

    logging.info("Saving this scraping execution infos")
    save_json(
        {
            "last_scraping": {
                "date": format_date,
                "pol_groups_and_deputes": {
                    "scraping_attempt": scrape_pol_groups_and_deputes,
                    "scraping_success": None,
                    "update_attempt": (
                        True
                        if database_insertion and scrape_pol_groups_and_deputes
                        else False
                    ),
                    "update_success": deputes_update_success,
                },
                "votes": {
                    "scraping_attempt": scrape_votes,
                    "scraping_success": None,
                    "update_attempt": (
                        True if database_insertion and updating_votes else False
                    ),
                    "update_success": vote_update_success,
                },
            }
        },
        LAST_SCRAPING_INFOS,
    )

    end_time = time.time()
    logging.info(f" ~ Execution time : {end_time - start_time} ~ ")

    logging.info(" -- Exiting main() function --")


if __name__ == "__main__":
    main()
