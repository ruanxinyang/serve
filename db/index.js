const mysql = require('mysql2');

const db = mysql.createPool({
    host: '150.158.55.244',
    port: 3306,
    user: 'root',
    password: 'ruan1234',
    database: 'dev',
    timezone: 'Z' 
});

module.exports = db;