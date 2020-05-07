const User = require('../models/user');

module.exports = {
  dashboard: async (request, response) => {
    // possibleReceivers(1) é o id da pessoa logada
    let users = await User.possibleReceivers(2);
    return response.view('home/dashboard', { users: users });
  },
  sendStars: async(request, response) =>{
    return response.redirect('/home')
  }
}
