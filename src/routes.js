const Path = require('path');

const home = require('./controllers/home.js');
const users = require('./controllers/users.js');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: home.dashboard
  },
  {
      method: 'GET',
      path: '/users',
      handler: users.index
  },
  {
      method: 'GET',
      path: '/users/form/{id?}',
      handler: users.form
  },
  {
      method: 'GET',
      path: '/users/delete/{id}',
      handler: users.destroy
  },
  {
      method: 'POST',
      path: '/users/{id}',
      handler: users.update
  },
  {
      method: 'POST',
      path: '/users',
      handler: users.create
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
