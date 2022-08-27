from os import stat
import config
import sqlite3
from sqlite3 import Error

# This method is used to establish a DB connection
def create_db(file):
    # Initializing connection object
    con = None
    try:
        con = sqlite3.connect(file)
    except Error as e:
        # In case of an error, debug by printing the error
        print(e)
    finally:
        # At last, close the connection if there was an open connection.
        if con:
            con.close()


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def connect():
    con = sqlite3.connect(config.db_file)
    # con.row_factory = sqlite3.Row
    con.row_factory = dict_factory
    return con


def disconnect(con):
    try:
        if con:
            con.close()
    except:
        pass


def prepare_response(status, data):
    return {"status": status, "data": data}


if __name__ == "__main__":
    create_db(config.db_file)
