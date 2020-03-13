const User = requireSrc('models/user');

test('GET /users', async function () {
  await dbConnection.query(`INSERT INTO users (name, email) 
        VALUES ("User 1", "email1@gmail.com"), 
        ("User 2", "email2@gmail.com"),
        ("User 3", "email3@gmail.com")`, { type: dbConnection.QueryTypes.INSERT });
  
  const response = await testServer.inject('/users');
  
  expect(response.statusCode).toBe(200);
  expect(response.result).toMatch(/User 1/);
  expect(response.result).toMatch(/User 2/);
  expect(response.result).toMatch(/User 3/);
});

test('GET /users/create', async function () {
  const response = await testServer.inject({
    method: 'POST',
    url: '/users',
    payload: { name: 'New User', email: 'newuser@email.com' }
  });
  
  expect(response.statusCode).toBe(200);

  const users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });

  expect(users[0]).toEqual({
    id: 1,
    name: 'New User',
    email: 'newuser@email.com'
  })
});