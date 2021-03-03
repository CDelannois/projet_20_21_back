const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jeux_de_societe'
});
connection.connect();
module.exports = connection;