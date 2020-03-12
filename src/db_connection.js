'use strict';

const Fs = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: Path.join(__dirname, '../db/database.sqlite')
});

sequelize.runQuery = async (...args) => {
  return sequelize.query(...args).results;
};
module.exports = sequelize;
