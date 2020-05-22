const Path = require('path');

const home = require('./controllers/home.js');
const users = require('./controllers/users.js');
const login = require('./controllers/login.js');
const transactionsSchema = require('./schemas/transactions.schemas')

module.exports = [
  {
    method: 'GET',
    path: '/home',
    handler: home.dashboard
  },
  {
    method: 'POST',
    path: '/home',
    handler: home.sendStars,
    // options:{
    //   validate:{
    //     payload: transactionsSchema,
    //   }
    // }
  },
  {
      method: 'POST',
      path: '/users',
      handler: users.create
  },
  {
    method: 'GET',
    path: '/login',
    handler: login.index
  },
  {
    method: 'POST',
    path: '/login',
    handler: login.currentUser
  },
  {
    // Generic route to server static files
    // If none of the routes bellow have matched with the path
    // we try to search on the public_static_files directory
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public_static_files')
      }
    }
  }
]
