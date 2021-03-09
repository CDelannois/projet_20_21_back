const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '51.91.208.24',
    user: 'charles',
    password: 'charles855',
    database: 'jeux_de_societe'
});
connection.connect();
module.exports = connection;