"""Execute db insertion"""

# def executeInsertions(sites, routes, sites_routes):
#     try:
#         # Insert values into tables
#         insertSites(sites)
#         insertRoutes(routes)
#         insertRelations(sites_routes)

#         # Commit the transaction
#         conn.commit()
#         print("Transaction committed successfully")

#     except (Exception, psycopg2.DatabaseError) as error:
#         # Rollback the transaction in case of error
#         conn.rollback()
#         print("Error occurred:", error)

#     finally:
#         # Close the cursor and connection
#         cur.close()
#         conn.close()
