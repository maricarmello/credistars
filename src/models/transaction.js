const dbConnection = require('../db_connection');

class Transaction {
constructor(attrs){
    this.transaction_id = attrs.transaction_id;
    this.user_id_sender = attrs.user_id_sender;
    this.user_id_receiver = attrs.user_id_receiver;
    this.quantity = attrs.quantity;
    this.message = attrs.message;
    this.value = attrs.value;
    this.date = attrs.date;
};
static async all() {
let data = await dbConnection.query("SELECT * FROM `transactions`", { type: dbConnection.QueryTypes.SELECT });
return data.map((attr) => new Transaction(attr));
}
static async create(attrs) {
    await dbConnection.query(`INSERT INTO transactions (user_id_sender, user_id_receiver, quantity, message, value, date) 
        VALUES ("${attrs.user_id_sender}", "${attrs.user_id_receiver}", "${attrs.quantity}", "${attrs.message}", "${attrs.value}", "${attrs.date}")`, { type: dbConnection.QueryTypes.INSERT });

    return true;
  }
}


module.exports = Transaction;
