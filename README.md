# Seed MVC HAPI project

# Installing node 

1) Install asdf 

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
cd ~/.asdf
git checkout "$(git describe --abbrev=0 --tags)"
```

2) Open a new terminal window to reload the config 

3.0) run `asdf plugin add nodejs`
3.1) run `sudo apt-get install gpg`
3.2) run `bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring`

4) run `asdf install`

# Project Setup 

1. Clone repo
2. Run `npm install`
3. Run `npm run start:devserver` if you change any file on the src folder the server will restart itself automagically
4. Visit http://localhost:3000/

# Database

We will use SQL Lite as database. 

SQLite is a lightweight database implementation that allows us to store all our data on a file (configured to be saved on the root folder of the application and to be ignored by git).

It doesn't need any aditional steps besides the initial `npm install` to work and we can query the database using SQL: `SELECT`, `INSERT`, `UPDATE`, etc...

## Managing database schema changes

This project uses the `umzug` library to keep track of database changes and keep your current database in sync with those changes. 

If you want to create a table, change a column or alter any part of the schema database follow these steps:

1) Create a file on the db/migrations folder. The name should start with the current count of files inside the folder
2) Run migration manager script with `node src/run_migrations.js`

This script will check if the migration has already been executed on your machine. If not, it will execute the UP property of the migration and mark it as executed using a table created automatically in order to track the history of executed migrations.

# Layout

We will be using a open source bootstrap template:

https://github.com/BlackrockDigital/startbootstrap-sb-admin-2

