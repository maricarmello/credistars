const dbConnection = require('../db_connection');

class Accumulated {
  constructor(attrs) {
    this.user_id = attrs.user_id;
    this.name = attrs.name;
    this.to_send = attrs.to_send;
    this.received = attrs.received;
  };

  static async show(currentUserId) {
    let data = await dbConnection.query("SELECT a.user_id, a.to_send, a.received " +
      "FROM accumulated a " +
      "WHERE user_id = :currentUserId", {
      replacements: {
        currentUserId: currentUserId,
      },
      type: dbConnection.QueryTypes.SELECT
    });
    return data.map((attr) => new Accumulated(attr));
  }

  static async maxStars() {
    let data = await dbConnection.query("SELECT u.name as name, a.received " +
      "FROM accumulated a " +
      "INNER JOIN users u ON u.user_id = a.user_id " +
      "WHERE received = (SELECT max(received) FROM accumulated);", {
      type: dbConnection.QueryTypes.SELECT
    });
    return data.map((attr) => new Accumulated(attr));
  }

  static async updateSender(user_id_sender, quantity) {
    await dbConnection.query("UPDATE accumulated " +
      "SET to_send = to_send-:quantity " +
      "WHERE user_id = :user_id_sender", {
      replacements: {
        user_id_sender: user_id_sender,
        quantity: quantity
      },
      type: dbConnection.QueryTypes.UPDATE
    });
    return true;
  }
  static async updateReceiver(user_id_receiver, quantity) {
    await dbConnection.query("UPDATE accumulated " +
      "SET received = received+:quantity " +
      "WHERE user_id = :user_id_receiver", {
      replacements: {
        user_id_receiver: user_id_receiver,
        quantity: quantity
      },
      type: dbConnection.QueryTypes.UPDATE
    });
    return true;
  }

}


module.exports = Accumulated;
