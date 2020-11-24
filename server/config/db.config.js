'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',  //localhost
    user: 'sql9378231',    //your username
    password: 're4w5hUWrq',     //your password
    database: 'sql9378231' //your database name
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;