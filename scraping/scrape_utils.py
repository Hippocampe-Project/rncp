from datetime import datetime, timedelta
import json
import logging
import re
import os


def sort_votes_by_vote_number(votes: list[dict]) -> list[dict]:
    sorted_votes = sorted(
        votes,
        key=lambda vote: vote["numero_vote"],
        reverse=True,
    )
    return sorted_votes


def save_json(data: dict, file_path: str):
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        logging.info(f"{data} saved at : {file_path}")
    except Exception as e:
        logging.error(f"Eror saving JSON : {e}")


def load_json(file_path: str) -> dict:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except Exception as e:
        logging.error(f"Error loading JSON : {e}")


def cleanup_logs(logs_directory):
    current_time = datetime.now()

    age_threshold = timedelta(days=30)

    for filename in os.listdir(logs_directory):
        file_path = os.path.join(logs_directory, filename)

        if os.path.isfile(file_path):
            file_creation_time = datetime.fromtimestamp(os.path.getctime(file_path))
            file_age = current_time - file_creation_time

            if file_age > age_threshold:
                logging.info(f"Deleting {filename} (older than 30 days)")
                os.remove(file_path)


def create_peristent_infos_json_if_needed(json_to_check: list):
    for files in json_to_check:
        if not os.path.exists(files):
            with open(files, "w") as f:
                json.dump({}, f)
            logging.info(f"Created: {files}")


def format_date(date_str) -> datetime:
    """date_str format == '13 février 2025'
    return 13-02-2025
    """

    parts = date_str.split(" ")
    day = parts[0]
    month = parts[1]
    year = parts[2]

    try:
        # Month mapping from French to numerical format
        month_mapping = {
            "janvier": "01",
            "février": "02",
            "mars": "03",
            "avril": "04",
            "mai": "05",
            "juin": "06",
            "juillet": "07",
            "août": "08",
            "septembre": "09",
            "octobre": "10",
            "novembre": "11",
            "décembre": "12",
        }

        month_number = month_mapping.get(month.lower())
        formatted_date = f"{day.zfill(2)}-{month_number}-{year}"
        to_datetime = datetime.strptime(formatted_date, "%d-%m-%Y")
        return to_datetime

    except (IndexError, ValueError) as e:
        print(f"Error in parsing {date_str} : {e}")
