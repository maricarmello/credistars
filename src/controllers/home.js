const User = require('../models/user');

module.exports = {
  dashboard: async (request, response) => {
    let users = await User.all();
    return response.view('home/dashboard', { users: users });
  }
}
