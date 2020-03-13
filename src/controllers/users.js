const User = require('../models/user');

module.exports = {
  index: async (request, response) => {
    let users = await User.all();
    return response.view('users/index', { users: users });
  },
  create: (request, response) => {
    if (User.create({ name: request.payload.name, email: request.payload.email })) {
      return `OK`;
    } {
      return `Error`;
    }
  },
  update: (request, response) => {
    let user = User.findById(request.query.id); 
    
    if (user == null) {
      return 'User not found';
    }

    if (user.updateAttributes({ name: request.query.name })) {
      return `OK`;
    } {
      return `Error`;
    }
  },
  destroy: (request, response) => {
    let user = User.findById(request.query.id); 
    
    if (user == null) {
      return 'User not found';
    }

    if (user.destroy()) {
      return `OK`;
    } {
      return `Error`;
    }
  },

}
