"""All db insertions"""

from db_connection import HandleDBConnection

db_handler = HandleDBConnection()
conn = db_handler.connect()

conn = connect_to_db()
cur = conn.cursor()


# def insert_political_groups(pol_grp):
#     for group in pol_grp:
#         name = group.get("name")
#         president = group.get("president")
#         query = "INSERT INTO your_table_name (name, president) VALUES (%s, %s)"
#         cur.execute(query, (name, president))
