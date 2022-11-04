"use strict";
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'parcialweb',
    user: 'root',
    password: ''
});
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log('CONEXIÓN EXITOSA');
    }
});
connection.end();
