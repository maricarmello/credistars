const Hapi = require('hapi');
const Ejs = require('ejs');

const dbConnection = require('./db_connection');

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

  // Configuring our database
  await dbConnection.sync().then(() => {
    server.start((err) => {
      Hoek.assert(!err, err);
      console.log(`Server running at: ${server.info.uri}`);
    });
  });

}


process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0'
});


configureHapi(server);

module.exports = {
  configureHapi: configureHapi
}