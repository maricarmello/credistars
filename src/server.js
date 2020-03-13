const Hapi = require('hapi');
const Ejs = require('ejs');

const dbConnection = require('./db_connection');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0'
});

async function configureHapi() {
  // Register plugins
  await server.register([
    require('@hapi/vision'),
    require('inert')
  ])

  // Vision plugin configuration
  server.views({
    engines: { ejs: Ejs },
    relativeTo: __dirname,
    path: 'views',
    layout: true,
    isCached: false
  });

  // Route configuration
  server.route(require('./routes'));
}

exports.init = async () => {
  await configureHapi();
  await server.initialize();
  return server;
};

exports.start = async () => {
  await configureHapi();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};
