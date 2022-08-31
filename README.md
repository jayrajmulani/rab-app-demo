# Programming challenge - RAB App Demo

## User Interface Overview

![Demo](./images/GIF.gif?raw=true "Demo")

## Background

In food animal systems, animals move to different farms as they age. Each farm has a unique ID and must keep a record of the movement of animals from one farm to another. Here, we present some fictitious records of movements among pig farms.

_Description of the data folder_

- _movements_: all records of animal movements

  - new_originpremid - column with the ID of the origin farm
  - new_destinationpremid - column with the ID of the destination farm
  - new_numitemsmovedcolumn - column with the number of moved animals

- _population_: complete list of the farms
  - premiseid - column with the ID of the farms
  - total_animal - column with the current number of animals for the farm

## Challenge

The challenge is to create a system to visualize the movement records. This
system have to follow the requirements bellow:

- Has to be composed of 3 components: a REST API, a SPA WEB client, and a
  relational database;
- The relational database can be any database that you like, PostgreSQL, MariaDB
  etc..;
- The data provided in this repo should be imported into the database;
- The REST API has to written in Java, Python or Typescript. It can use any
  framework/library that you desire;
- The Web Client have to written in Typecript, and you can use any _SPA
  framework/library_ that you desire, ex Angular, React, etc...;
- Your submitted project should include instructions on how to run it;

The submitted project will be evaluated considering your experience. For example, a
person with a background in backend development will be evaluated with higher
expectations of the API and database code. A UI person will be evaluated with
higher expectations on the design of the UI.

Bonus points will be awarded for creativity and implementing things outside the
requirements, such as:

- having an authentication in the system
- Using docker
- Having a script to run all components
- Importing the supplied data into a well normalized schema

# Solution

## Overview

This is a demo web app developed using:

[![React][react.js]][react-url]
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/

## Getting started

1. Clone the github [repository](https://github.com/jayrajmulani/rab-app-demo.git)
2. [Install docker](https://docs.docker.com/get-docker/), if it's not already installed in your system!
3. Start the docker containers [Commands mentioned below, although its just one command :) ]

## How to run the app?

_**Note:** This project is not meant to be run in a production environment. The commands below will start development servers only._

```
git clone https://github.com/jayrajmulani/rab-app-demo.git
cd rab-app-demo
docker-compose up --build (if running the app for the first time)
docker-compose up (Otherwise...)
```

## Using the app

1. Go to your browser and enter the URL http://localhost:3000 or http://127.0.0.1:3000
2. Click on Register if you are using the app for the first time.
3. Use the same credentials to login to the system.
4. Browse around tabs, visualize the data and have fun!
5. Suggestions welcome :)

## Behind the scenes

### Development Specifications

#### Data Model

![Data model](./images/Data%20Model.png?raw=true "Data Model")

#### APIs

| Endpoint               | Request Type | Parameters                                                 | Response                               | Remarks                                                                                                                                           |
| ---------------------- | ------------ | ---------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/register`            | POST         | `{email : string, password: string, display_name: string}` | `{status: boolean, data: string/JSON}` | Used for new user registration                                                                                                                    |
| `/login`               | POST         | `{email : string, password: string}`                       | `{status: boolean, data: string/JSON}` | Used to authenticate users. Response may contain error message in case of failing authentications, or logged in user's details in the JSON format |
| `/get_population_data` | GET          | NA                                                         | `{status: boolean, data: JSON}`        | Returns a list of Premises along with their corresponding animal count.                                                                           |
| `/get_movements_data`  | GET          | NA                                                         | `{status: boolean, data: JSON}`        | Returns a list of Movements data with information about origin, destination, shipment start date, count of items moved, lat, long etc.            |
| `/get_premises_data`   | GET          | NA                                                         | `{status: boolean, data: JSON}`        | Returns a list of Premises with the lat long information, mainly used for generating markers on the google map.                                   |
| `/load_data`           | GET          | NA                                                         | `{status: boolean, data: string}`      | Used to load data from the CSV file into the Database. Developoed for internal use. Not to be used or called from an external location and/or UI. |
