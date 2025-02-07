from datetime import datetime
import json
import os
import logging

from config_urls import LAST_VOTE_FILE


def sort_votes_by_vote_number(votes: list[dict]) -> list[dict]:
    sorted_votes = sorted(
        votes,
        key=lambda vote: vote["vote_number"],
        reverse=True,
    )
    return sorted_votes


def save_json(data: dict, filename: str, directory: str):

    if not os.path.exists(directory):
        logging.warning(f"Directory {directory} doesn't exists")
    else:

        file_path = os.path.join(directory, filename)
        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(data, file)
        logging.info(f"JSON file {filename} saved at : {file_path}")


def load_json(file_path: str) -> dict:
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
    return data
