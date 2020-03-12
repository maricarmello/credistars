const Hapi = require('hapi');

const Ejs = require('ejs');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0'
});

const init = async () => {
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
    layout: true
  });

  // Route configuration
  server.route(require('./routes'));

  //Booting the server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
