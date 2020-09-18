const User = require('../models/user');
const Transaction = require('../models/transaction');
const Accumulated = require('../models/accumulated');
const Value = require('../models/values');
const { WebClient } = require('@slack/web-api');
// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);


let currentUserId = 1;

module.exports = {

  dashboard: async (request, response) => {

    let currentUser = await User.findById(currentUserId);

    let users = await User.possibleReceivers(currentUserId);

    let transactions = await Transaction.all(currentUserId);

    let myTransactions = await Transaction.myfeed(currentUserId);

    let countValues = await Value.count();

    let labels = await countValues.map((e)=>e.value);

    let data = await countValues.map((e)=>e.sum);

    let accumulated = await Accumulated.show(currentUserId);

    let superStar = await Accumulated.maxStars();


    return response.view('home/dashboard', {
      currentUser: currentUser,
      users: users,
      transactions: transactions,
      myTransactions: myTransactions,
      countValues: countValues,
      accumulated: accumulated,
      superStar: superStar,
      labels: labels,
      data: data
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
    let sender = await User.findById(transaction.user_id_sender)
    let receiver = await User.findById(transaction.user_id_receiver)

    let message = {
      channel: '#news',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:star2:  *${transaction.value}*  :star2:`
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${receiver.name} recebeu +${transaction.quantity} :star2: de ${sender.name}.`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `"${transaction.message}"`
            }
          },
          {
            type: 'divider'
          }
        ]
    };
    
    try {
      await web.chat.postMessage(message)
    } catch(e) {
      console.log(e);
    }

    return response.redirect('/home')
  }
}
