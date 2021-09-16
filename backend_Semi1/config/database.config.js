var mysql = require('mysql');

/*var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: 'Proyecto1Semi1'
});*/

var connection = mysql.createConnection({
  host: "semi1db.cloc09h4p0yq.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: 'Proyecto1Semi1'
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } 
    console.log("Conectado a la db");
});

module.exports = connection;