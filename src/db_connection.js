'use strict';

const Fs = require('fs');
const Path = require('path');
const Sequelize = require('sequelize');

let storage = Path.join(__dirname, '../db/database.sqlite');

if (process.env.NODE_ENV == 'test') {
  storage = ':memory:'
}

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: storage
});

module.exports = sequelize;
