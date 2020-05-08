const User = require('../models/user');
const Transaction = require('../models/transaction')

let currentUserId = 1;

module.exports = {
  
  dashboard: async (request, response) => {

    let currentUser = await User.findById(currentUserId);

    let users = await User.possibleReceivers(currentUserId);

    let transactions = await Transaction.all();

    return response.view('home/dashboard', { currentUser:currentUser, users: users, transactions: transactions });
  },
  sendStars: async(request, response) =>{
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();


    let transaction = {
      user_id_sender: currentUserId,
      user_id_receiver: request.payload.user_id_receiver,
      quantity: request.payload.quantity,
      message: request.payload.message,
      value: request.payload.value,
      date: day + "/" + (month+1) + "/" + year + " as " + hour + ':' + min 
    };
    await Transaction.create(transaction);
    return response.redirect('/home')
  }
}
