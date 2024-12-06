import os
import psycopg2
from psycopg2.extras import execute_batch
import logging
from dotenv import load_dotenv

# from pathlib import Path
# dotenv_path = Path("/scraping")
# dotenv.load_dotenv(dotenv_path=dotenv_path)

load_dotenv()


class HandleDatabase:
    def __init__(self):
        self.db_name = os.getenv("DB_NAME")
        self.db_host = os.getenv("DB_HOST")
        self.db_user = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_port = os.getenv("DB_PORT")
        self.conn = None
        self.cursor = None

    def __repr__(self):
        return (
            f"HandleDatabase(db_name='{self.db_name}', "
            f"db_host='{self.db_host}', "
            f"db_user='{self.db_user}', "
            f"db_password='{'*' * len(self.db_password) if self.db_password else None}', "
            f"db_port='{self.db_port}', "
            f"conn={'Connected' if self.conn else 'Not Connected'}, "
            f"cursor={'Initialized' if self.cursor else 'Not Initialized'})"
        )

    def connect(self):
        if self.conn is None:
            try:
                self.conn = psycopg2.connect(
                    dbname=self.db_name,
                    host=self.db_host,
                    user=self.db_user,
                    password=self.db_password,
                    port=self.db_port,
                )
                logging.info("Database connection established successfully")
            except psycopg2.DatabaseError as error:
                logging.error(f"Error connecting to the database: {error}")
        else:
            logging.warning("Connection already exist.")

    def create_cursor(self):
        if self.cursor is None:
            try:
                self.cursor = self.conn.cursor()
            except psycopg2.DatabaseError as error:
                logging.error(f"Database cursor creation failed : {error}")
        else:
            logging.warning("Cursor already exist.")

    def __enter__(self):
        self.connect()
        self.create_cursor()
        return self

    def __exit__(self):
        self.cursor.close()
        self.close()

    def test_db_conn(self):
        self.connect()
        logging.info(self)
        self.close()

    @classmethod
    def define_insert_query(data: list[dict], table_name: str) -> str:
        if not data:
            raise ValueError("Data cannot be empty.")
        # Dynamically defines which columns the INSERT statement should target.
        columns = data[0].keys()
        column_name = ", ".join(columns)
        # Dynamically defines the number of values to insert
        placeholders = ", ".join(["%s"] * len(columns))
        query = f"INSERT INTO {table_name} ({column_name}) VALUES ({placeholders})"
        return query

    @classmethod
    def define_insert_values(data: list[dict]) -> list[tuple]:
        if not data:
            raise ValueError("Data cannot be empty.")
        keys = data[0].keys()
        # Create a list of tuple with values corresponding to keys
        values = [tuple(el[k] for k in keys) for el in data]
        return values

    def execute_query(self, query, params=None):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return None
        try:
            self.cursor.execute(query, params)
            logging.info("Query executed successfully.")
        except psycopg2.DatabaseError as error:
            logging.error(f"Error executing query: {error}")

    def execute_batch_query(self, query: str, data: list[tuple]):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return
        try:
            execute_batch(self.cursor, query, data)
            logging.info(f"Batch query {query} executed successfully.")
        except psycopg2.DatabaseError as error:
            self.conn.rollback()
            logging.error(f"Error executing batch query {query}: {error}")

    def execute_insertion(self, data: list[dict], table_name: str):
        insertion_query = self.define_insert_query(data, table_name)
        insertion_values = self.define_insert_values(data)
        self.execute_batch_query(insertion_query, insertion_values)

    def commit(self):
        self.conn.commit()

    def close(self):
        if self.cursor:
            self.cursor.close()
            logging.info("Database cursor closed.")
        if self.conn:
            self.conn.close()
            logging.info("Database connection closed.")
        else:
            logging.error("Error : tried to close unexisting cursor or connection.")
