from datetime import datetime
import logging
import sys
import os

from scrape_utils import load_json, format_date
from update.pol_groups_changes import scrape_last_groupe_composition_change
from error_handler import custom_exit


def should_update_deputes(depute_file) -> bool:

    try:
        logging.info("Searching for last deputes update...")
        if not os.path.exists(depute_file):
            logging.info(
                "No deputes update file found : setting deputes scraper to scraping all deputes"
            )
            return False
        else:
            logging.info(
                "Found deputes update file. Searching for changes in political group composition ..."
            )
            last_deputes_scraping_infos = load_json(depute_file)
            last_deputes_scraping_date: str = last_deputes_scraping_infos.get(
                "last_scraped_deputes"
            )
            logging.info(
                f"Last time political group composition was udpated : {last_deputes_scraping_date}"
            )
            last_group_modification_date: datetime = (
                scrape_last_groupe_composition_change()
            )
            logging.info(
                f"Last political group composition modification : {last_group_modification_date}"
            )
            if last_group_modification_date > datetime.strptime(
                last_deputes_scraping_date, "%d-%m-%Y"
            ):
                logging.info("Should update deputes table")
                return True
            else:
                logging.info("No need to update deputes table")
                return False

    except KeyboardInterrupt:
        logging.warning("Process interrupted, cleaning up and exiting.")
        sys.exit(0)
    except Exception as e:
        logging.error(f"Error trying to get last deputes update : {e}")
        custom_exit()


def should_update_votes(vote_file) -> bool:

    try:
        logging.info("Searching for last vote udpdate...")
        if not os.path.exists(vote_file):
            logging.info(
                "No votes update file found : setting votes scraper to scraping all votes"
            )
            return False
        else:
            logging.info(
                "Found votes update file : setting votes scraper to updating mode"
            )
            return True

    except KeyboardInterrupt:
        logging.warning("Process interrupted, cleaning up and exiting.")
        sys.exit(0)
    except Exception as e:
        logging.error(f"Error trying to get last vote update : {e}")
        custom_exit()
