const dbConnection = require('../db_connection');

class Accumulated {
constructor(attrs){
  this.user_id = attrs.user_id;
  this.to_send = attrs.to_send;
  this.received = attrs.received;
};

  static async updateSender(user_id_sender, quantity) {
      await dbConnection.query(`UPDATE accumulated 
          SET to_send = to_send-:quantity
          WHERE user_id = :user_id_sender`, {
            replacements: {
              user_id_sender: user_id_sender,
              quantity: quantity
          },
          type: dbConnection.QueryTypes.UPDATE 
      }); 
  return true;
  }
  static async updateReceiver(user_id_receiver, quantity) {
    await dbConnection.query(`UPDATE accumulated 
        SET received = received+:quantity
        WHERE user_id = :user_id_receiver`, {
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
