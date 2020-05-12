const dbConnection = require('../db_connection');

class Transaction {
    constructor(attrs) {
        this.transaction_id = attrs.transaction_id;
        this.sender = attrs.sender;
        this.receiver = attrs.receiver;
        this.quantity = attrs.quantity;
        this.message = attrs.message;
        this.value = attrs.value;
        this.date = attrs.date;
    };
    static async all() {
        let data = await dbConnection.query(
            "SELECT t.transaction_id, us.name as sender, ur.name as receiver, t.quantity, t.message, t.value, t.date " +
            "FROM transactions t " +
            "INNER JOIN users us ON us.user_id = t.user_id_sender " +
            "INNER JOIN users ur ON ur.user_id = t.user_id_receiver " +
            "ORDER BY transaction_id DESC", { type: dbConnection.QueryTypes.SELECT });
        return data.map((attr) => new Transaction(attr));
    }

    static async create(attrs) {
        await dbConnection.query(`INSERT INTO transactions (user_id_sender, user_id_receiver, quantity, message, value, date) 
            VALUES ("${attrs.user_id_sender}", "${attrs.user_id_receiver}", "${attrs.quantity}", "${attrs.message}", "${attrs.value}", "${attrs.date}")`, { type: dbConnection.QueryTypes.INSERT });

        return true;
    }
    static async myfeed(currentId) {
        let data = await dbConnection.query(
            "SELECT t.transaction_id, us.name as sender, ur.name as receiver, t.quantity, t.message, t.value, t.date " +
            "FROM transactions t " +
            "INNER JOIN users us ON us.user_id = t.user_id_sender " +
            "INNER JOIN users ur ON ur.user_id = t.user_id_receiver " +
            "WHERE us.user_id = :currentId OR ur.user_id = :currentId " +
            "ORDER BY transaction_id DESC " +
            "LIMIT 3",
            {
                replacements: {
                    currentId: currentId
                },
                type: dbConnection.QueryTypes.SELECT
            });
        return data.map((attr) => new Transaction(attr));
    }
}



module.exports = Transaction;
