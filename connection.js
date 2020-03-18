const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Subasundar@25",
    database : "bank",
    multipleStatements : true,
    socketPath: "/var/run/mysqld/mysqld.sock"
    
});

mysqlConnection.connect((err)=>{
    
    if(!err)
         {
             console.log("connected");


         }
    else
         {
        console.log("connection failed");
         }
})
 
module.exports = mysqlConnection;