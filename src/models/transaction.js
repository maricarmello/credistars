const dbConnection = require('../db_connection');

class transaction {
    constructor(attrs){
      this.transaction_id = attrs.transaction_id;
      this.user_id_sender = attrs.user_id_sender;
      this.user_id_receiver = attrs.user_id_receiver;
      this.quantity = attrs.quantity;
      this.massage = attrs.massage;
      this.value = attrs.value;
      this.date = attrs.date;

  
    };
}