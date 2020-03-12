const requestHandler = require('./users.js');

test('Responds with 10 users', () => {
  console.log(global.testServer)
  // let myFakeResponse = new FakeResponse();
  // let htmlResponse = requestHandler.handler({}, myFakeResponse);
  // expect(htmlResponse.match(/<li>Name:/g).length).toBe(10)
});
