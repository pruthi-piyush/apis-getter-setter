


  *************************************************************************
  *************************************************************************
  *************************************************************************
  *************************************************************************
  
- PREREQUISITES :-

  This project requires you to install Node.js, npm , and postgresql server.

  *************************************************************************
  *************************************************************************
  *************************************************************************
  *************************************************************************

- DATABASE CONFIGURATION :-

  You will need to add database configuration in krazybee/modules/dbConnector/dbConnector.js file.
  In its constructor,

  this.pool = new Pool(
      {
        user : 'piyush',
        host : '127.0.0.1',
        database : 'typicode',
        password : 'piyush123',
        port : 5432
      }
      )

  Update these 5 parameters with configuration of your postgres server.

  Also, you need to make 2 tables in database using following commands :-


  create table album( id integer PRIMARY KEY, userid integer, title character varying );

  create table photo ( id integer NOT NULL, albumid integer NOT NULL, title character varying, url character varying, thumbnailurl character varying );

  alter table photo add constraint ck_albumid_id UNIQUE(albumid, id);

  *************************************************************************
  *************************************************************************
  *************************************************************************
  *************************************************************************

- HOW TO RUN THIS PROJECT ? 

  For running this project, please follow below instructions :-

  1. Enter into krazybee directory.

  2. Once you enter this directory, you will be able to see package.json and package-lock.json files.

  3. Run npm install

  4. Once completed, you can start the project using :-
      
     npm start or node app.js

  *************************************************************************
  *************************************************************************
  *************************************************************************
  *************************************************************************

- DESIGN OVERVIEW- 

  All the custom modules developed have been kept in modules/ directory.

  All the routes handling( incoming API requests are in routes/ directory ).

  A module named dataFetcher is responsible for fetching data.

  When the system gets started, we make call to fetch data.
  This can also be done, when only requested.
  But for now, when system is up, it fetches data and tries to inert into database.
  If rows already exist in database, error is logged.

  A module named dbConnector is used for handling all database related operations.

- ENDPOINT DETAILS :-


  http://localhost:8080/search?type=album&id=1

  http://localhost:8080/search?type=photo&album=2&id=100
