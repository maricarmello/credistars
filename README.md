# Seed MVC HAPI project


# Requirements
- NodeJS v12.14.x

# Resources

Base bootstrap template: https://github.com/BlackrockDigital/startbootstrap-sb-admin-2

# Running tests

The command `npm run test` will run tests from /tests folder. We are using the `jest` library to write our tests.

https://jestjs.io/docs/en/getting-started

# Project Setup 

1. Clone repo
1. Run `npm install`
1. Create .env from .env.sample `cp .env.sample .env``
1. Fill env variables on .env file
1. Run migrations to create the `users` table `node src/run_migrations.js`
1. Run `npm run start:devserver` if you change any file on the src folder the server will restart itself automagically
1. Visit http://localhost:3000/


  
