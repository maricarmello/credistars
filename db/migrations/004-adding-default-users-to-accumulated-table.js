const Sequelize = require('sequelize');

module.exports = {
    up: async function (queryInterface, Sequelize) {

        return [
          queryInterface.bulkInsert('accumulated', [
            { user_id: "1", to_send: "1000", received: "0"},
            { user_id: "2", to_send: "1000", received: "0"},
            { user_id: "3", to_send: "1000", received: "0"},
            { user_id: "4", to_send: "1000", received: "0"},
            { user_id: "5", to_send: "1000", received: "0"},
            { user_id: "6", to_send: "1000", received: "0"},
            { user_id: "7", to_send: "1000", received: "0"},
            { user_id: "8", to_send: "1000", received: "0"},
            { user_id: "9", to_send: "1000", received: "0"},
            { user_id: "10", to_send: "1000", received: "0"}
        ])
        ];
      }
};