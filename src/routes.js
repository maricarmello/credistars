const Path = require('path');

const users = require('./controllers/users.js');

module.exports = [
  {
      method: 'GET',
      path: '/users',
      handler: users.index
  },
  {
      method: 'GET',
      path: '/users/destroy/{id}',
      handler: users.destroy
  },
  {
      method: 'GET',
      path: '/users/update',
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
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public_static_files')
      }
    }
  }
]
