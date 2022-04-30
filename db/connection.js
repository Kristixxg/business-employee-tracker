const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect();

db.query = util.promisify(db.query);

module.exports = db;