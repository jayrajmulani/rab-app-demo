CREATE TABLE USERS(
    EMAIL VARCHAR2(255) PRIMARY KEY,
    DISPLAY_NAME VARCHAR2(100),
    PASSWORD VARCHAR2(255)
);
CREATE TABLE TRANSFERS(
    COMPANY VARCHAR2(100),
    REASON VARCHAR2(255),
    SPECIES VARCHAR2(50),
    ORIGIN_PREM_ID VARCHAR2(8) REFERENCES PREMISES(PREM_ID),
    DESTINATION_PREM_ID VARCHAR2(8) REFERENCES PREMISES(PREM_ID),
    SHIPMENT_START_DATE DATE,
    COUNT_ITEMS_MOVED NUMBER
);
CREATE TABLE POPULATION(
    PREM_ID VARCHAR2(8) REFERENCES PREMISES(PREM_ID),
    TOTAL_ANIMALS NUMBER
)

CREATE TABLE PREMISES (
    PREM_ID VARCHAR2(8) PRIMARY KEY,
    ADDRESS VARCHAR2(60),
    CITY VARCHAR2(30),
    NAME VARCHAR2(60),
    POSTAL_CODE NUMBER,
    STATE VARCHAR2(2),
    LAT NUMBER,
    LONG NUMBER
);