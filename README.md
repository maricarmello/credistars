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

# TODOs

## Basic routing

Let's create a new route.

1) Take a look at `routes.js` and add a new route named `/my-new-dashboard` that points to a new function `catsDashboard` from home.js controller. 

2) Create a view on `views/home/catsDashboard.ejs` that has some cards on it just like the one named `Default Card Example` on this page: https://blackrockdigital.github.io/startbootstrap-sb-admin-2/cards.html 

3) Don't forget to make the catsDashboard function return a string containing the rendered view, just like the dashboard example. 

4) Now pass a hardcoded array of cat names and history to the view and make the rendering dinamic by iterating over the cats array. 

```javascript 
//...
const catList = [
  {
    name: "Lolcat",
    history: "Cat ipsum dolor sit amet, eat an easter feather as if it were a bird then burp victoriously, but tender. Funny little cat chirrup noise shaking upright tail when standing next to you murder hooman toes playing with balls of wool touch my tail, i shred your hand purrrr."
  },
  {
    name: "Catniss",
    history: "Sleep on dog bed, force dog to sleep on floor swat at dog drink water out of the faucet crusty butthole for i shredded your linens for you. Need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me eats owners hair then claws head but side-eyes your "jerk" other hand while being petted but pretend you want to go out but then don't. Drool walk on car leaving trail of paw prints on hood and windshield."
  },
  {
    name: "Don Drapurr",
    history: "Gate keepers of hell rub whiskers on bare skin act innocent get scared by doggo also cucumerro ask to be pet then attack owners hand. Lie on your belly and purr when you are asleep sugar, my siamese, stalks me (in a good way), day and night sit in window and stare oooh, a bird, yum cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet wack the mini furry mouse, but destroy house in 5 seconds."
  },
  {
    name: "Chairman Meow",
    history: "atty ipsum eat the rubberband that box? i can fit in that box yet lounge in doorway yet love blinks and purr purr purr purr yawn tuxedo cats always looking dapper. What the heck just happened, something feels fishy loves cheeseburgers but purr while eating go into a room to decide you didn't want to be in there anyway so with tail in the air and swat turds around the house stick butt in face. Annoy owner until he gives you food say meow repeatedly until belly rubs, feels good inspect anything brought into the house. "
  },
]
return response.view('home/catsDashboard', { cats: catList });
//...
```

## Using the database and doing CRUDs (CREATE, READ, UPDATE, DELETE)

Take a look at the `users.js` controller and study how it interacts with the routes and view. 

You can access the Users CRUD acessing the `/users` path on the browser. 

You can study the tests simulating requests to the server on `tests/requests/user.test.js`

Now it's your turn. Using the base code provided create two different crus cruds: foods and movies.

PS: DO NOT COPY AND PASTE. WRITE THE CODE YOURSELF

### FAQ

*Hey, do I need to create tests?*
Yes. ![I'm watching you](readme/watchingyou.png "I'm watching you")


## Aditional Challenges

- Create a button on the users lists to activate/deactivate each user.
- Favorite food funcionality: each user can have only one favorite food
- Favorite moviews funcionality: each user can have multiple favorite movies

### Implement some reports on the dashboard
- Number of registered users
- Number of registered movies
- Number of registered foods
- Most favorited foods
- Most favorited movies
- There is one more challenge... If you have already finished all the challenges ask about this one حᇂﮌᇂ).