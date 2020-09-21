const User = require('../models/user');
const Transaction = require('../models/transaction');
const Accumulated = require('../models/accumulated');
const Value = require('../models/values');
const { WebClient } = require('@slack/web-api');
// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);

let currentUserId = 1;

function formatDate(date) {
  function pad(m) {
    return m < 10 ? '0' + m : m;
  }

  return (
    [date.getDate(), date.getMonth() + 1, date.getFullYear()]
      .map(pad)
      .join('/') +
    ' as ' +
    [date.getHours(), date.getMinutes()].map(pad).join(':')
  );
}

module.exports = {
  dashboard: async (request, response) => {
    const currentDate = new Date();

    let currentUser = await User.findById(currentUserId);

    let users = await User.possibleReceivers(currentUserId);

    let transactions = await Transaction.all(currentUserId);

    let totalTransactions = await Transaction.all(currentUserId);

    let myTransactions = await Transaction.myfeed(currentUserId);

    let countValues = await Value.count();

    let labels = await countValues.map((e) => e.value);

    let data = await countValues.map((e) => e.sum);

    let superStar = await Accumulated.maxStars();

    if (
      myTransactions.length > 0 &&
      new Date(myTransactions[0].date).getMonth() !== currentDate.getMonth()
    ) {
      Accumulated.resetAvailableStars(currentUserId);
    }

    let accumulated = await Accumulated.show(currentUserId);

    myTransactions.forEach(
      (transaction) =>
        (transaction.date = formatDate(new Date(transaction.date)))
    );

    transactions.forEach(
      (transaction) =>
        (transaction.date = formatDate(new Date(transaction.date)))
    );

    function paginate(content, pageSize, pageNumber) {
      if (isNaN(pageNumber)) {
        pageNumber = 1
      }
      return content.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    return response.view('home/dashboard', {
      currentUser: currentUser,
      users: users,
      currentPage: isNaN(request.query.paging)? 1 :request.query.paging,
      totalTransactions: totalTransactions,
      transactions: paginate(transactions, 2, request.query.paging),
      myTransactions: myTransactions,
      countValues: countValues,
      accumulated: accumulated,
      superStar: superStar,
      labels: labels,
      data: data,
    });
  },
  sendStars: async (request, response) => {

    let transaction = {
      user_id_sender: currentUserId,
      user_id_receiver: request.payload.user_id_receiver,
      quantity: request.payload.quantity,
      message: request.payload.message,
      value: request.payload.value,
      date: new Date(),
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
            text: `:star2:  *${transaction.value}*  :star2:`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${receiver.name} recebeu +${transaction.quantity} :star2: de ${sender.name}.`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `"${transaction.message}"`,
          },
        },
        {
          type: 'divider',
        },
      ],
    };
    
    try {
      await web.chat.postMessage(message)
    } catch(e) {
      console.log(e);
    }

    return response.redirect('/home')
  }
}