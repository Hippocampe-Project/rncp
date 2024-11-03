import os
from logging_utils import info_logger, error_logger
from chrome_driver_handler import ChromeDriverHandler
from get_web_page_urls import (
    scrape_political_parties_urls,
    scrape_representatives_personal_page_url,
)
from scrape_representatives import scrape_every_representative

# Access the environment variables
chrome_bin = os.getenv("CHROME_BIN")
chrome_driver = os.getenv("CHROME_DRIVER")

entry_point_url = "https://www.assemblee-nationale.fr/dyn/les-groupes-politiques"


def main():
    info_logger.info(" -- Starting main() function --")

    driver_handler = ChromeDriverHandler(chrome_bin, chrome_driver)

    political_groups_links = scrape_political_parties_urls(entry_point_url)
    parties_table, all_representatives_urls = scrape_representatives_personal_page_url(
        driver_handler, political_groups_links
    )
    info_logger(f"Final parties table : {parties_table}")
    representatives_table = scrape_every_representative(all_representatives_urls)
    info_logger(f"Final representatives table : {representatives_table}")

    info_logger.info(" -- Exiting main() function --")


if __name__ == "__main__":

    main()
