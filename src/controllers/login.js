const User = require('../models/user');

module.exports = {
  index: async (request, response) => {
    return response.view('login/index', null, {layout: false});
  },
  currentUser: async (request, response) => {

    if(await(User.findByEmail(request.payload.user_email))){
      console.log("casopositivo")
      return response.redirect('/home');
      } else {
      console.log("casonegativo")
        return response.view('/users');
      }
    }
  }

  