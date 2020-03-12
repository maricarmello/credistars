// Nothing

beforeAll(() => {
  global.testServer = require('src/main').server;
})


afterAll(() => {
  return global.testServer.stop();
});