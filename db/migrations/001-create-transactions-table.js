const Sequelize = require('sequelize');

// All migrations must provide a `up` and `down` async functions
module.exports = {
  // `query` was passed in the `index.js` file
  up: async (query) => {
    await query.createTable('transactions', {
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id_sender: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id_receiver: {
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
      value:{
        type: Sequelize.STRING,
        allowNull: false
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