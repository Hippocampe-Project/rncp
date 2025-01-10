"""All db insertions"""

import logging
from database.db_operations import HandleDatabase
from database.config_database import (
    DEPARTEMENTS_TABLE,
    COMMISSIONS_TABLES,
    PARTIES_TABLES,
    REPRESENTATIVES_TABLES,
)

# def test_db_conn():
#     db = HandleDatabase()
#     db.test_db_conn()


def database_insertion(
    departements: list[dict],
    commissions: list[dict],
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
    db = HandleDatabase()
    db.connect()
    db.create_cursor()

    # Inserting raw data
    db.execute_insertion(departements, DEPARTEMENTS_TABLE)
    db.execute_insertion(commissions, COMMISSIONS_TABLES)
    db.execute_insertion(parties, PARTIES_TABLES)
    db.execute_insertion(representatives, REPRESENTATIVES_TABLES)

    db.commit()
    db.cursor.close()
    db.cursor = None
    logging.info("Database insertion completed successfully")

    # Mapping foreign keys
    db.create_cursor()

    db.execute_deputes_update_queries(representatives)

    db.commit()
    logging.info("Databse update of table deputes completed successfully")

    db.close()
