const dbConnection = require('../db_connection');

class Value {
    constructor(attrs) {
        this.value = attrs.value;
        this.sum = attrs.sum;
    };

    static async count() {
        let data = await dbConnection.query(
            "SELECT value, count(*) as sum " +
            "FROM transactions t " +
            "GROUP BY value ", { type: dbConnection.QueryTypes.SELECT });
        return data.map((attr) => new Value(attr));
    }
}

module.exports = Value;
