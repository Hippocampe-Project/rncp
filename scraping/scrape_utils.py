from datetime import datetime


def sort_votes_by_date(votes: list[dict]) -> list[dict]:
    sorted_votes = sorted(
        votes,
        key=lambda vote: datetime.strptime(vote["date"], "%d-%m-%Y"),
        reverse=True,
    )
    return sorted_votes
