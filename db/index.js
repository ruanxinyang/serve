const mysql = require('mysql');

const db = mysql.createPool({
    host: 'rm-wz9s7m9p2c9787v2xvo.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'Ruan1234',
    password: 'Ruan1234',
    database: 'dev',
    timezone: 'Z' 
});

module.exports = db;