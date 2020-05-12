const User = require('../models/user');
const Transaction = require('../models/transaction');
const Accumulated = require('../models/accumulated');
const Value = require('../models/values');



let currentUserId = 1;

module.exports = {

  dashboard: async (request, response) => {

    let currentUser = await User.findById(currentUserId);

    let users = await User.possibleReceivers(currentUserId);

    let transactions = await Transaction.all(currentUserId);

    let myTransactions = await Transaction.myfeed(currentUserId);

    let countValues = await Value.count();

    let accumulated = await Accumulated.show(currentUserId);

    let superStar = await Accumulated.maxStars();


    return response.view('home/dashboard', {
      currentUser: currentUser,
      users: users,
      transactions: transactions,
      myTransactions: myTransactions,
      countValues: countValues,
      accumulated: accumulated,
      superStar: superStar
    });
  },
  sendStars: async (request, response) => {


    function currentDate() {
      function pad(m) {
        return (m < 10) ? '0' + m : m;
      }
      var date = new Date();
      return [date.getDate(), date.getMonth(), date.getFullYear()].map(pad).join('/') + " as " + [date.getHours(), date.getMinutes()].map(pad).join(':');
    }


    let transaction = {
      user_id_sender: currentUserId,
      user_id_receiver: request.payload.user_id_receiver,
      quantity: request.payload.quantity,
      message: request.payload.message,
      value: request.payload.value,
      date: currentDate()
    };
    await Transaction.create(transaction);
    await Accumulated.updateSender(transaction.user_id_sender, transaction.quantity)
    await Accumulated.updateReceiver(transaction.user_id_receiver, transaction.quantity)

    return response.redirect('/home')
  }
}
