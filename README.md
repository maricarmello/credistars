# Seed MVC HAPI project

# Installing node 

1) Install asdf 

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
cd ~/.asdf
git checkout "$(git describe --abbrev=0 --tags)"
```

2) Open a new terminal window to reload the config 

3) run `asdf plugin add nodejs`

4) run `sudo apt-get install gpg`

5) run `bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring`

6) run `asdf install` inside the project's folder

# Database

We will use SQL Lite as database. 

SQLite is a lightweight database implementation that allows us to store all our data on a file (configured to be saved on the root folder of the application and to be ignored by git).

It doesn't need any aditional steps besides the initial `npm install` to work and we can query the database using SQL: `SELECT`, `INSERT`, `UPDATE`, etc...

You can explore and test queries openning the `database.sqlite` file under `db` folder using the following program: https://sqlitebrowser.org/
## Managing database schema changes

This project uses the `umzug` library to keep track of database changes and keep your current database in sync with those changes. 

If you want to create a table, change a column or alter any part of the schema database follow these steps:

1) Create a file on the db/migrations folder. The name should start with the current count of files inside the folder
2) Run migration manager script with `node src/run_migrations.js`

This script will check if the migration has already been executed on your machine. If not, it will execute the UP property of the migration and mark it as executed using a table created automatically in order to track the history of executed migrations.

# Layout

We will be using a open source bootstrap template:

https://github.com/BlackrockDigital/startbootstrap-sb-admin-2

# Running tests

The command `npm run test` will run tests from /tests folder. We are using the `jest` library to write our tests.

https://jestjs.io/docs/en/getting-started

# Project Setup 

1. Clone repo
2. Run `npm install`
3. Run migrations to create the `users` table `node src/run_migrations.js`
4. Run `npm run start:devserver` if you change any file on the src folder the server will restart itself automagically
5. Visit http://localhost:3000/


  
