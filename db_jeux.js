const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '135.125.95.178',
    user: 'charles',
    password: '!rdzS%QLw/-E8n3#',
    database: 'jeux_de_societe'
});
connection.connect();
module.exports = connection;