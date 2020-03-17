const Sequelize = require('sequelize');

// All migrations must provide a `up` and `down` async functions
module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    await query.addColumn('users', 'email', {
      type: Sequelize.STRING
    })
  },
  down: async (query) => {
    await query.removeColumn('users', 'email')
  }
}