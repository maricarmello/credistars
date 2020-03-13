const Hapi = require('hapi');
const Ejs = require('ejs');

const server = require('./server');

server.start();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
