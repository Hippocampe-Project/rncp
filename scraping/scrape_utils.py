from datetime import datetime
import json
import os
import logging

from config_urls import LAST_VOTE_FILE


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
            json.dump(data, file, ensure_ascii=False)
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
