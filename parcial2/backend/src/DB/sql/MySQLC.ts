var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost:3307',
    user     : 'root',
    password : 'informatica'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err:any, rows:any, fields:any) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

connection.end();