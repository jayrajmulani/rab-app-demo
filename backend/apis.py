import queue
from shutil import move
import bcrypt
import config
import utils
import pandas as pd

pd.options.mode.chained_assignment = None
from datetime import date, datetime


def register(data):
    try:
        con = utils.connect()
    except:
        return utils.prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"]
        password = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        display_name = data["display_name"]

        # Check if email id is already present.
        cur = con.cursor()
        query = "SELECT email FROM USERS WHERE EMAIL = :1"
        params = [email]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return utils.prepare_response(
                False, f"User with email {email} already exists."
            )

        # If it is a new user, insert the details into the database.
        query = "INSERT INTO USERS (EMAIL, DISPLAY_NAME, PASSWORD) VALUES (:1,:2,:3)"
        params = [email, display_name, password]
        cur.execute(query, params)
        con.commit()
        return utils.prepare_response(
            True, f"User Registration Successful. Welcome {display_name}"
        )
    except Exception as e:
        print(e)
        return utils.prepare_response(False, str(e))
    finally:
        utils.disconnect(con)


def login(data):
    print(data)
    try:
        con = utils.connect()
    except:
        return utils.prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"]
        password = data["password"]

        # Check if user exists
        cur = con.cursor()
        query = "SELECT email, password FROM USERS WHERE EMAIL = :1"
        params = [email]
        res = cur.execute(query, params)
        row = res.fetchone()
        print(row)
        if row is None:
            return utils.prepare_response(
                False, f"User with email {email} doesn't exist. Please register first."
            )
        valid = bcrypt.checkpw(password.encode("utf-8"), row["password"])
        if valid:
            return utils.prepare_response(True, "Login Successful")
        else:
            return utils.prepare_response(False, "Invalid Credentials.")
    except Exception as e:
        print(e)
        return utils.prepare_response(False, str(e))
    finally:
        utils.disconnect(con)


def load_data():
    try:
        con = utils.connect()
    except:
        return utils.prepare_response(False, "Unable to create DB connection")
    # Read data from CSV files
    movements = pd.read_csv(config.movements)
    population = pd.read_csv(config.population)[["premiseid", "total_animal"]]
    population = list(population.itertuples(index=False, name=None))
    try:
        # Insert Population Data
        cur = con.cursor()
        query = "INSERT INTO POPULATION(PREM_ID, TOTAL_ANIMALS) VALUES (?,?)"
        cur.executemany(query, population)
        print("Population Data inserted successfully")

        # Insert Origin Data
        origin = movements[
            [
                "new_originaddress",
                "new_origincity",
                "new_originname",
                "new_originpostalcode",
                "new_originpremid",
                "new_originstate",
                "origin_Lat",
                "origin_Lon",
            ]
        ]
        query = "INSERT INTO PREMISES(ADDRESS, CITY, NAME, POSTAL_CODE, PREM_ID, STATE, LAT, LONG) VALUES (?,?,?,?,?,?,?,?)"
        origin = list(origin.itertuples(index=False, name=None))
        cur.executemany(query, origin)
        destination = movements[
            [
                "new_destinationaddress",
                "new_destinationcity",
                "new_destinationname",
                "new_destinationpostalcode",
                "new_destinationpremid",
                "new_destinationstate",
                "destination_Lat",
                "destination_Long",
            ]
        ]
        query = "INSERT INTO PREMISES(ADDRESS, CITY, NAME, POSTAL_CODE, PREM_ID, STATE, LAT, LONG) VALUES (?,?,?,?,?,?,?,?)"
        destination = list(destination.itertuples(index=False, name=None))
        cur.executemany(query, destination)

        transfers = movements[
            [
                "account/company",
                "new_movementreason",
                "new_species",
                "new_originpremid",
                "new_destinationpremid",
                "new_numitemsmoved",
                "new_shipmentsstartdate",
            ]
        ]
        query = "INSERT INTO TRANSFERS(COMPANY, REASON, SPECIES, ORIGIN_PREM_ID, DESTINATION_PREM_ID, SHIPMENT_START_DATE, COUNT_ITEMS_MOVED) VALUES (?,?,?,?,?,?,?)"
        transfers = list(transfers.itertuples(index=False, name=None))
        cur.executemany(query, transfers)
        con.commit()
        return utils.prepare_response(True, "Data loaded Successfully.")
    except Exception as e:
        print(e)
        return utils.prepare_response(False, str(e))
    finally:
        utils.disconnect(con)


def get_population_data():
    try:
        con = utils.connect()
    except:
        return utils.prepare_response(False, "Unable to create DB connection")
    try:
        cur = con.cursor()
        query = "SELECT POPULATION.PREM_ID, TOTAL_ANIMALS, NAME, ADDRESS, CITY, STATE, POSTAL_CODE FROM POPULATION, PREMISES WHERE POPULATION.PREM_ID = PREMISES.PREM_ID"
        res = cur.execute(query)
        rows = res.fetchall()
        return utils.prepare_response(True, rows)
    except Exception as e:
        print(e)
        return utils.prepare_response(False, str(e))
    finally:
        utils.disconnect(con)


# load_data()
get_population_data()
