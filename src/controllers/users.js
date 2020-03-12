const User = require('../models/user');

module.exports = {
  index: (request, response) => {
    return response.view('users/index', { users: User.all() });
  },
  create: (request, response) => {
    if (User.create({ name: request.query.name })) {
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
