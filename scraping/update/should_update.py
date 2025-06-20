from datetime import datetime
import logging

from scrape_utils import load_json, format_date
from update.pol_groups_changes import scrape_last_groupe_composition_change


def should_update_deputes(filepath) -> bool:
    logging.info("Searching for changes in political group composition ...")
    last_deputes_scraping_infos = load_json(filepath)
    if last_deputes_scraping_infos == {}:
        logging.info("No need to update deputes table")
        return False
    last_deputes_scraping_date: str = last_deputes_scraping_infos.get(
        "last_scraped_deputes"
    )
    logging.info(
        f"Last time political group composition was udpated : {last_deputes_scraping_date}"
    )
    last_group_modification_date: datetime = scrape_last_groupe_composition_change()
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
