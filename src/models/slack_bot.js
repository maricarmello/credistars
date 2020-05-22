const dbConnection = require('../db_connection');

class Slack {
    constructor(attrs){
        this.sender = attrs.sender;
        this.receiver = attrs.receiver;
        this.quantity = attrs.quantity;
        this.message = attrs.message;
        this.value = attrs.value;
    }
    static async notification(){
        let data = await dbConnection.query(
            "SELECT us.name as sender, ur.name as receiver, t.quantity, t.message, t.value " +
            "FROM transactions t " +
            "INNER JOIN users us ON us.user_id = t.user_id_sender " +
            "INNER JOIN users ur ON ur.user_id = t.user_id_receiver ", { type: dbConnection.QueryTypes.SELECT });
        return data.map((attr) => new Slack(attr));
    }

}

module.exports = Slack;