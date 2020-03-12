const dbConnection = require('../db_connection');

class User {
  constructor(attrs){
    this._name = attrs.name;
    this._id = attrs.id;
  };

  get name(){
    return this._name;
  }

  get id(){
    return this._id;
  }

  static async all() {
    let users = await dbConnection.query("SELECT * FROM `users`", { type: dbConnection.QueryTypes.SELECT });

    return users;
  }

  static findById(id) {
    return User.storedData.find((u) => u.id == id);
  }

  static async create(attrs) {
    attrs.id = User.storedData.length; 
    let users = await dbConnection.query(`INSERT INTO users (name, email) 
        VALUES ("${attrs.name}", "${attrs.email}")`, { type: dbConnection.QueryTypes.INSERT });

    User.storedData.push(new User(attrs));
    return true;
  }

  destroy() {
    User.storedData = User.storedData.filter((u) => u != this);
    return true;
  }


  updateAttributes(newAttrs) {
    this._name = newAttrs.name;
    return true;
  }
}

module.exports = User;
