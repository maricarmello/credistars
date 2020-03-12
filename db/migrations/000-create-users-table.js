const Sequelize = require('sequelize');

// All migrations must provide a `up` and `down` async functions
module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    await query.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  down: async (query) => {
    await query.dropTable('users')
  }
}