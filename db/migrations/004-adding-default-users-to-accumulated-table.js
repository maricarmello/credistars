const Sequelize = require('sequelize');

module.exports = {
    up: async function (queryInterface, Sequelize) {

        return [
          queryInterface.bulkInsert('accumulated', [
            { id_user: "1", to_send: "1000", received: "0"},
            { id_user: "2", to_send: "1000", received: "0"},
            { id_user: "3", to_send: "1000", received: "0"},
            { id_user: "4", to_send: "1000", received: "0"},
            { id_user: "5", to_send: "1000", received: "0"},
            { id_user: "6", to_send: "1000", received: "0"},
            { id_user: "7", to_send: "1000", received: "0"},
            { id_user: "8", to_send: "1000", received: "0"},
            { id_user: "9", to_send: "1000", received: "0"},
            { id_user: "10", to_send: "1000", received: "0"}
        ])
        ];
      }
};