const User = require('../models/user');

module.exports = {
  index: async (request, response) => {
    let users = await User.all();
    return response.view('users/index', { users: users });
  },
  create: async (request, response) => {
    const dataToSave = { name: request.payload.user_name, email: request.payload.user_email };

    if (await User.create(dataToSave)) {
      return response.redirect('/users');
    } {
      return response.view('users/form', { userToEdit: dataToSave });
    }
  },
  form: async (request, response) => {
    let user = {}

    if (request.params.id) {
      user = await User.findById(request.params.id); 
    }

    return response.view('users/form', { userToEdit: user });
  },
  update: async (request, response) => {
    let user = await User.findById(request.params.id); 

    let attrs_to_update = {
      name: request.payload.user_name,
      email: request.payload.user_email
    }

    if (await user.updateAttributes(attrs_to_update)) {
      return response.redirect('/users');
    } else {
      return response.view('users/form', { userToEdit: dataToSave });
    }
  },
  destroy: async (request, response) => {
    let user = await User.findById(request.params.id); 
    
    if (user.destroy()) {
      return response.redirect('/users');
    } {
      return `Error`;
    }
  },

}
