# 320-F20-Track-III 
Introduction
## How to get the Front-end Running
1. Download node.js version 12.18.4 and npm https://www.npmjs.com/get-npm
2. Pull or clone the Github repository
3. cd into the ethisim folder
4. Install Dependencies
  - npm install react@16.13.1
  - npm install react-device-detect@1.14.0
  - npm install react-dom@16.13.1
  - npm install react-flow-renderer@6.1.3
  - npm install react-router-dom@5.2.0
  - npm install react-scripts@3.4.4
  - npm install @material-ui/core@4.11.0
  - npm install @material-ui/icons@4.9.1
  - npm install @material-ui/lab@4.0.0-alpha.56
  - npm install @testing-library/jest-dom@5.11.4
  - npm install @testing-library/react@11.0.4
  - npm install @testing-library/user-event@12.1.6
  - npm install axios@0.21.0
  - npm install start@5.1.0
  - npm install suneditor-react@2.14.2
 
 6.
 5. Run the front-end, use npm start to run the development build

## How to get the Back-end Running
### On MAC
1. Install python3 https://www.python.org/downloads/
2. sudo pip3 install pipenv (do it globally)
3. pipenv shell
4. pipenv install django djangorestframework django-rest-knox\
5. pipenv install django-filter (or pip3 install django-filter)
6. pip install psycopg2 (or pip install django psycopg2 or pip install psycopg2-binary or pipenv run pip3 install psycopg2-binary)
7. pip install django-cors-headers
8. cd lead
9. python3 manage.py runserver

#### How to run server:
1. Go to moral_kombat_backend directory
2. pipenv shell
3. cd lead
4. python3 manage.py runserver

### On WINDOWS
1. https://www.python.org/downloads/ (Checkmark all optional features, add Python to environment variables)
2. Open Terminal
3. (IF RUN INTO ERRORS INSERT py -m before each command)
4. pip install pipwin
5. pipwin install psycopg2
6. pip install django djangorestframework django-rest-knox
7. pip install django-filter (or pip3 install django-filter)
8. Might need to download https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

#### How to run server:
1. Go to moral_kombat_backend directory
2. cd moral_kombat_backend
3. cd lead
4. py -m manage.py runserver

### TEST:
Go to postman and send a GET request to http://localhost:8000/api/scenarios (Should get Array of scenarios)
