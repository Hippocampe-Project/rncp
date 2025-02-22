"""All db insertions"""

import logging
from typing import TYPE_CHECKING
from database.config_database import (
    DEPARTEMENTS_TABLE,
    COMMISSIONS_TABLE,
    PARTIES_TABLE,
    REPRESENTATIVES_TABLE,
    VOTES_TABLE,
    TEMP_REPRESENTATIVES_TABLE,
)

if TYPE_CHECKING:
    from database.db_operations import HandleDatabase


def permanent_infos_database_insertion(
    db: "HandleDatabase", departements: list[dict], commissions: list[dict]
):

    db.connect()
    db.create_cursor()

    # Inserting raw data
    db.execute_insertion(departements, DEPARTEMENTS_TABLE)
    db.execute_insertion(commissions, COMMISSIONS_TABLE)


def pol_groups_and_deputes_database_insertion(
    db: "HandleDatabase",
    parties: list[dict],
    representatives: list[dict],
):
    """Execute the transaction to database for MVP data

    N.b. :
        psycopg2 manage insertion under the hood :
        Sending a query with a .cursor() object initiates a new transaction.
        All query executed with this cursor object will belong to the same transaction.
        The transaction will conclude by calling .commit() or when encountering en error (.rollback()).
    """
    db.connect()
    db.create_cursor()

    # Inserting raw data
    db.execute_insertion(parties, PARTIES_TABLE)
    db.execute_insertion(representatives, REPRESENTATIVES_TABLE)

    db.commit()
    db.cursor.close()
    db.cursor = None

    # Mapping foreign keys
    db.create_cursor()

    db.execute_deputes_update_queries(representatives)

    db.commit()

    db.close()


def votes_database_insertion(db: "HandleDatabase", votes: list[dict]):

    db.connect()
    db.create_cursor()

    db.execute_insertion(votes, VOTES_TABLE)

    db.commit()

    db.close()


def update_deputes_database_table(db: "HandleDatabase", representatives: list[dict]):

    db.connect()
    db.create_cursor()

    db.compare_deputes_with_temp_deputes_table(
        REPRESENTATIVES_TABLE, TEMP_REPRESENTATIVES_TABLE, representatives
    )

    db.close()
