const Sequelize = require('sequelize');

// All migrations must provide a `up` and `down` async functions
module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    await query.createTable('accumulated', {
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      to_send: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      received: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },
  down: async (query) => {
    await query.dropTable('accumulated')
  }
}