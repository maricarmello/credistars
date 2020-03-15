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

test('POST /users', async function () {
  const response = await testServer.inject({
    method: 'POST',
    url: '/users',
    payload: { user_name: 'New User', user_email: 'newuser@email.com' }
  });
  
  // redirect
  expect(response.statusCode).toBe(302);

  const users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });

  expect(users[0]).toEqual({
    id: 1,
    name: 'New User',
    email: 'newuser@email.com'
  })
});


test('POST /users/ID', async function () {
  await dbConnection.query(`INSERT INTO users (name, email) 
    VALUES ("User", "user@email.com")`, { type: dbConnection.QueryTypes.INSERT });

  let users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });

  const response = await testServer.inject({
    method: 'POST',
    url: '/users/' + users[0].id,
    payload: { user_name: 'Edited User', user_email: 'user@email.com' }
  });
  
  // redirect
  expect(response.statusCode).toBe(302);

  users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });
    
  expect(users[0]).toEqual({
    id: 1,
    name: 'Edited User',
    email: 'user@email.com'
  })
});


test('GET /users/delete/ID', async function () {
  await dbConnection.query(`INSERT INTO users (name, email) 
    VALUES ("User", "user@email.com")`, { type: dbConnection.QueryTypes.INSERT });

  let users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });

  const response = await testServer.inject({
    method: 'GET',
    url: '/users/delete/' + users[0].id
  });
  
  // redirect
  expect(response.statusCode).toBe(302);

  users = await dbConnection.query(`SELECT * FROM users`, 
    { type: dbConnection.QueryTypes.SELECT });

  expect(users.length).toBe(0);
});