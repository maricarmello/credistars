const dbConnection = require('../db_connection');

class Achievement {

  static async sentStars(currentId) {

    let data = await dbConnection.query("SELECT count(*) as cont FROM `transactions` WHERE user_id_sender == :currentId", 
    { 
      replacements: {
        currentId: currentId
      },
      type: dbConnection.QueryTypes.SELECT 
    });

    let totalSentTransactions = data[0]['cont'];

    return totalSentTransactions > 0;
  }

  static async receivedStars(currentId) {

    let data = await dbConnection.query("SELECT count(*) as cont FROM `transactions` WHERE user_id_receiver == :currentId", 
    { 
      replacements: {
        currentId: currentId
      },
      type: dbConnection.QueryTypes.SELECT 
    });

    let totalSentTransactions = data[0]['cont'];

    return totalSentTransactions > 0;
  }

  static async threeDistinctValues(currentId) {

    let data = await dbConnection.query("SELECT DISTINCT value FROM `transactions` WHERE user_id_receiver == :currentId", 
    { 
      replacements: {
        currentId: currentId
      },
      type: dbConnection.QueryTypes.SELECT 
    });

    let listOfRecognizedValues = data.flatMap(x => [x['value']] );

    return listOfRecognizedValues.length >= 3;
  }

  static async recognizedForEveryValue(currentId) {

    let data = await dbConnection.query("SELECT DISTINCT value FROM `transactions` WHERE user_id_receiver == :currentId", 
    { 
      replacements: {
        currentId: currentId
      },
      type: dbConnection.QueryTypes.SELECT 
    });

    let listOfRecognizedValues = data.flatMap(x => [x['value']] );

    return listOfRecognizedValues.length == 7;
  };  
}

module.exports = Achievement;
