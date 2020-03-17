const dbConnection = require('../db_connection');

class User {
  constructor(attrs){
    this.name = attrs.name;
    this.email = attrs.email;
    this.id = attrs.id;
  };

  static async all() {
    let data = await dbConnection.query("SELECT * FROM `users`", { type: dbConnection.QueryTypes.SELECT });
    return data.map((attr) => new User(attr));
  }

  static async findById(id) {
    let data = await dbConnection.query("SELECT * FROM `users` WHERE id = :id", 
    { 
      replacements: {
        id: id
      },
      type: dbConnection.QueryTypes.SELECT 
    });

    return new User(data[0]);
  }

  static async create(attrs) {
    await dbConnection.query(`INSERT INTO users (name, email) 
        VALUES ("${attrs.name}", "${attrs.email}")`, { type: dbConnection.QueryTypes.INSERT });

    return true;
  }

  async destroy() {
    
    await dbConnection.query(`DELETE FROM users 
        WHERE id='${this.id}'`, { type: dbConnection.QueryTypes.DELETE });

    return true;
  }

  async updateAttributes(attrs) {
    await dbConnection.query(`UPDATE users 
        SET name="${attrs.name}", email="${attrs.email}"
        WHERE id='${this.id}'`, { type: dbConnection.QueryTypes.UPDATE });
    this.name = attrs.name;
    this.email = attrs.email;
    return true;
  }
}

module.exports = User;
