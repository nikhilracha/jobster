'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: '35.239.215.173',  //localhost
    user: 'root',    //your username
    password: 'cs691jobster',     //your password
    database: 'jobster' //your database name
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;
