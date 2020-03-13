// Nothing
const initServer = require('./src/server').init;
const runMigrations = require('./src/run_migrations').runMigrations;

global.dbConnection = require('./src/db_connection');

global.requireSrc = (path) => {
  const normalizedPath = path.replace(/^\./, '').replace(/^\//, '');
  return require('./src/' + normalizedPath);
}

beforeAll(async () => {
  global.TIMEOUT = 3000;
  await runMigrations();
  global.testServer = await initServer();
})


beforeEach(async () => {
  await global.dbConnection.query('DELETE FROM users;');
})

afterAll(async () => {
  return global.testServer.stop();
});