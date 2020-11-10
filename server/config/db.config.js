'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',  //localhost
    user: 'sql9375796',    //your username
    password: 'wiNfw1aGyi',     //your password
    database: 'sql9375796' //your database name
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;