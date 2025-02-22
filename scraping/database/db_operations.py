import os
import psycopg2
from psycopg2 import sql
from psycopg2.extras import execute_batch
import logging
from dotenv import load_dotenv


import logging

logging.basicConfig(
    level=logging.INFO,  # Adjust to DEBUG if needed
    format="%(asctime)s - %(levelname)s - %(message)s",
)

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
        self.query_success = None

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
            logging.warning("Tried to create new cursor but : cursor already exist.")

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

    @staticmethod
    def define_insert_query(data: list[dict], table_name: str) -> psycopg2.sql.Composed:
        if not data:
            raise ValueError("Data cannot be empty.")
        # Dynamically defines which columns the INSERT statement should target.
        columns = data[0].keys()
        column_name = [sql.Identifier(col) for col in columns]
        # Dynamically defines the number of values to insert
        placeholders = sql.SQL(", ").join(sql.Placeholder() for _ in columns)
        query = sql.SQL(
            "INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        ).format(
            table=sql.Identifier(table_name),
            columns=sql.SQL(", ").join(column_name),
            placeholders=placeholders,
        )

        return query

    @staticmethod
    def define_select_query(table_name: str) -> str:
        return sql.SQL("SELECT * FROM {table}").format(table=sql.Identifier(table_name))

    @staticmethod
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

    def fetch_table_data(self, table):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return
        try:
            fetch_query = HandleDatabase.define_select_query(table)
            self.cursor.execute(fetch_query)

            # Fetch column names
            col_names = [desc[0] for desc in self.cursor.description]

            # Fetch all rows and convert to a list of dictionaries
            rows = self.cursor.fetchall()
            result = [dict(zip(col_names, row)) for row in rows]

            return result
        except psycopg2.DatabaseError as error:
            logging.error(f"Error while fething data of table {table} : {error}")
            return []

    @staticmethod
    def prepare_deputes_update_parameters(column_name: str) -> str:
        """
        column_name
        new_column = column_id
        foreing_table = columns (except for "commission")
        """
        new_column = column_name[:-5] + "_id"
        foreign_table = (
            "commissions_p" if "commission" in column_name else column_name[:-5] + "s"
        )

        return new_column, foreign_table

    def update_table_with_fk_mapping(
        self, table_name, foreign_table, name_column, id_column
    ):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return

        try:
            # Step 1: Add the id_column to the table if it doesn't exist
            add_id_column_query = sql.SQL(
                """
                DO $$
                BEGIN
                    ALTER TABLE {table} ADD COLUMN {id_column} INT NULL;
                EXCEPTION WHEN others THEN
                    RAISE NOTICE 'Error adding column: %', SQLERRM;
                    RAISE;
                END $$;
            """
            ).format(
                table=sql.Identifier(table_name),
                id_column=sql.Identifier(id_column),
            )

            logging.info(f"Adding column {id_column} to table {table_name}")
            self.cursor.execute(add_id_column_query)

            # Step 2: Insert the id_column with id values from the foreign table
            insert_id_column_query = sql.SQL(
                """
                DO $$
                BEGIN
                    UPDATE {table}
                    SET {id_column} = (
                        SELECT id FROM {foreign_table}
                        WHERE {foreign_table}.nom = {table}.{name_column} LIMIT 1
                    )
                    WHERE {id_column} IS NULL;
                EXCEPTION WHEN others THEN
                    RAISE NOTICE 'Error inserting {id_column}: %', SQLERRM;
                    RAISE;
                END $$;
            """
            ).format(
                table=sql.Identifier(table_name),
                id_column=sql.Identifier(id_column),
                foreign_table=sql.Identifier(foreign_table),
                name_column=sql.Identifier(name_column),
            )

            logging.info(f"Inserting column {id_column} in table {table_name}")
            self.cursor.execute(insert_id_column_query)

            # Step 3: Add the foreign key constraint to the id_column
            add_foreign_key_query = sql.SQL(
                """
                DO $$
                BEGIN
                    ALTER TABLE {table}
                    ADD CONSTRAINT {fk_constraint}
                    FOREIGN KEY ({id_column})
                    REFERENCES {foreign_table}(id)
                    ON DELETE SET NULL
                    ON UPDATE CASCADE;
                EXCEPTION WHEN others THEN
                    RAISE NOTICE 'Error adding foreign key constraint: %', SQLERRM;
                    RAISE;
                END $$;
            """
            ).format(
                table=sql.Identifier(table_name),
                fk_constraint=sql.Identifier(f"fk_{id_column}"),
                id_column=sql.Identifier(id_column),
                foreign_table=sql.Identifier(foreign_table),
            )

            logging.info(
                f"Adding foreign key constraint for column {id_column} in table {table_name}"
            )
            self.cursor.execute(add_foreign_key_query)

            # Step 4 : Delete column_name column
            delete_column_name_query = sql.SQL(
                """
            DO $$
            BEGIN
                -- Attempt to drop the column from the table
                BEGIN
                    ALTER TABLE {table}
                    DROP COLUMN {column};
                EXCEPTION WHEN others THEN
                    RAISE NOTICE 'Error dropping column {column}: %', SQLERRM;
                END;
            END $$;
            """
            ).format(
                table=sql.Identifier(table_name),
                column=sql.Identifier(name_column),
            )

            logging.info(f"Delete {name_column} from {table_name}")
            self.cursor.execute(delete_column_name_query)

        except psycopg2.DatabaseError as error:
            self.conn.rollback()
            logging.error(f"Error updating {id_column} of table {table_name}: {error}")

    def execute_deputes_update_queries(
        self, data: list[tuple], deputes_table="deputes"
    ):
        try:
            keys = data[0].keys()

            for key in keys:
                if key.endswith("_name"):
                    new_id_column, foreign_table = (
                        HandleDatabase.prepare_deputes_update_parameters(key)
                    )
                    self.update_table_with_fk_mapping(
                        deputes_table, foreign_table, key, new_id_column
                    )
            logging.info("Deputes table's foreign keys updated successfully")
            self.query_success = True
        except psycopg2.DatabaseError as error:
            self.conn.rollback()
            logging.error(f"Error executing table deputes update query : {error}")
            self.query_success = False

    def execute_batch_insertion_query(
        self, query: str, data: list[tuple], table_name: str
    ):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return
        try:
            execute_batch(self.cursor, query, data)
            logging.info(
                f"Batch insertion query executed successfully for table {table_name}."
            )
            self.query_success = True
        except psycopg2.DatabaseError as error:
            self.conn.rollback()
            logging.error(
                f"Error executing batch insertion query for table {table_name} : {error}"
            )
            self.query_success = False

    def execute_insertion(self, data: list[dict], table_name: str):
        """Takes the list of dictionaries containing the scraped data of a single scrape model
            and extract the sql query and the values to inject and perform a batch injection.
        Args:
            data (list[dict]): a list of dictionnaries formated with the same scrappe model
            table_name (str): the name of the db table we want to inject into
        """
        insertion_query: psycopg2.sql.Composed = HandleDatabase.define_insert_query(
            data, table_name
        )
        insertion_values: list[tuple] = HandleDatabase.define_insert_values(data)
        self.execute_batch_insertion_query(
            insertion_query, insertion_values, table_name
        )

    def create_new_table(self, temp_table_name, data: list[dict]):
        try:
            columns = data[0].keys()
            columns_definitions = []
            type_mapping = {
                int: "INTEGER",
                str: "TEXT",
                float: "FLOAT",
                bool: "BOOLEAN",
                type(None): "NULL",
            }
            columns_definitions.append("id SERIAL PRIMARY KEY")
            for col in columns:
                value_type = type(data[0][col])
                psql_type = type_mapping.get(value_type)
                columns_definitions.append(f"{col} {psql_type}")

            columns_definition_str = ", ".join(columns_definitions)
            logging.info(
                f"New table '{temp_table_name}' collumns definition : {columns_definition_str}"
            )

            query = sql.SQL(
                # "CREATE TEMPORARY TABLE IF NOT EXISTS {temp_table} ({columns})"
                "CREATE TABLE IF NOT EXISTS {temp_table} ({columns})"
            ).format(
                temp_table=sql.Identifier(temp_table_name),
                columns=sql.SQL(columns_definition_str),
            )

            self.cursor.execute(query)
            logging.info(f"Temporary table '{temp_table_name}' successfully created")
        except psycopg2.DatabaseError as error:
            logging.error(f"Error creating {temp_table_name} : {error}")

    def drop_table(self, table_name):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return
        try:
            query = f"DROP TABLE IF EXISTS {table_name}"
            self.cursor.execute(query)
            logging.info(f"{table_name} successfully deleted")
        except psycopg2.DatabaseError as error:
            logging.error(f"Error droping table: {table_name} : {error}")

    def compare_deputes_with_temp_deputes_table(
        self, main_table: str, temp_table_name: str, data: list[dict]
    ):
        if not self.cursor:
            logging.error("No cursor available to execute the query.")
            return
        try:
            # Step 1 : create new deputes table and insert newly scraped value in it.
            self.create_new_table(temp_table_name, data)
            self.execute_insertion(data, temp_table_name)
            self.commit()
            self.cursor.close()
            self.cursor = None
            # Step 2 : map deputes table foreign key.
            self.create_cursor()
            self.execute_deputes_update_queries(
                data, deputes_table=temp_table_name
            )  # this function is not reusable bc of this method
            self.commit()
            # Step 3 : compare the new temporary deputes table with the former one and update the later.
            coll_order = "nom, date_naissance, sexe, circonscription, profession, suppleant, photo, departement_id, commission_permanente_id, parti_id, activite"
            self.insert_missing_data(main_table, temp_table_name, coll_order)
            self.mark_outdated_data(main_table, temp_table_name)
            # Step 4 : drop temporary deputes table.
            self.drop_table(temp_table_name)
            self.commit()
            logging.info("Database insertion completed successfully")
            self.query_success = True
        except psycopg2.DatabaseError as error:
            logging.error(
                f"Error updating {main_table} with {temp_table_name} : {error}"
            )
            self.drop_table(temp_table_name)
            self.query_success = False

    def insert_missing_data(self, main_table: str, temp_table: str, coll_order: str):
        try:
            query = f"""
                INSERT INTO {main_table} ({coll_order})
                SELECT {coll_order}
                FROM {temp_table} 
                WHERE NOT EXISTS (
                    SELECT 1 FROM {main_table} 
                    WHERE {main_table}.nom = {temp_table}.nom
                );
            """
            self.cursor.execute(query)
            logging.info("Successfully inserted new deputies")
        except psycopg2.DatabaseError as error:
            logging.error(f"Error inserting new deputies : {error}")

    def mark_outdated_data(self, main_table: str, temp_table: str):
        try:
            query = f"""
                UPDATE {main_table}
                SET activite = FALSE
                WHERE nom NOT IN (
                    SELECT nom FROM {temp_table}
                );
            """
            self.cursor.execute(query)
            logging.info("Successfully updated inactive deputes")
        except psycopg2.DatabaseError as error:
            logging.error(f"Error updating inactive deputes : {error}")

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


# Update db separatelly :

# logging.info("Executing db_operations.py")
# db = HandleDatabase()
# db.connect()
# db.create_cursor()


# data = [
#     {
#         "nom": "",
#         "sexe": "",
#         "date_naissance": "",
#         "departement_name": "",
#         "circonscription": "",
#         "commission_permanente_name": "",
#         "profession": "",
#         "suppleant": "",
#         "parti_name": "",
#         "photo": "",
#     }
# ]

# db.execute_deputes_update_queries(data)

# db.commit()

# db.close()
