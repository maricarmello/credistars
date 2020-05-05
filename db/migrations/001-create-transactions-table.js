const Sequelize = require('sequelize');

// All migrations must provide a `up` and `down` async functions
module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    await query.createTable('transactions', {
      id_transaction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_user_sender: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_user_receiver: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    })
  },
  down: async (query) => {
    await query.dropTable('transactions')
  }
}