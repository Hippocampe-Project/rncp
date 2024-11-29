import os
import psycopg2
import logging
import dotenv

dotenv.load_dotenv()
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")


class HandleDBConnection:
    def __init__(self):
        self.db_name = os.getenv("DB_NAME")
        self.db_host = os.getenv("DB_HOST")
        self.db_user = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_port = os.getenv("DB_PORT")
        self.connection = self.connect()
        self.cursor = self.create_cursor()

    def connect(self):
        try:
            self.connection = psycopg2.connect(
                dbname=self.db_name,
                host=self.db_host,
                user=self.db_user,
                password=self.db_password,
                port=self.db_port,
            )
            logging.info("Database connection established successfully")
        except Exception as error:
            logging.error(f"Error connecting to the database: {error}")
            self.connection = None

    def create_cursor(self):
        try:
            self.cursor = self.connection.cursor()
        except Exception as error:
            logging.error(f"Database cursor creation failed : {error}")
            self.cursor = None

    def __enter__(self):
        self.connect()
        self.create_cursor()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def execute_query(self, query, params=None):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return None
        try:
            self.cursor.execute(query, params)
            logging.info("Query executed successfully.")
        except Exception as error:
            logging.error(f"Error executing query: {error}")

    def close(self):
        if self.cursor:
            self.cursor.close()
            logging.info("Databse cursor closed.")
        if self.connection:
            self.connection.close()
            logging.info("Database connection closed.")
