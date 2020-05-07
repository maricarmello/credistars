const User = require('../models/user');
const Transaction = require('../models/transaction')
let currentUserId = 1;

module.exports = {
  
  dashboard: async (request, response) => {

    let users = await User.possibleReceivers(currentUserId);

    let transactions = await Transaction.all();

    return response.view('home/dashboard', { users: users, transactions: transactions });
  },
  sendStars: async(request, response) =>{

    let transaction = {
      user_id_sender: currentUserId,
      user_id_receiver: request.payload.user_id_receiver,
      quantity: request.payload.quantity,
      massage: request.payload.massage,
      value: request.payload.value,
      date: new Date()
    };
    await Transaction.create(transaction);
    return response.redirect('/home')
  }
}
