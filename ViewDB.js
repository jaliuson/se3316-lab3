var mysql = require('mysql');

let conn = mysql.createConnection({
    host:'104.154.137.46',
    user: 'root',
    password:'8898',
    database:'usersDB'
});

conn.connect(function(err) {
  if (err) throw err;{
    conn.query("SHOW TABLES", function (err, result, fields) {
        if (err) throw err;{
            console.log("Table List__________________________________________")
            console.log(result);
            console.log("\n")
        }
    });
    
    conn.query("SELECT * FROM Doodles", function (err, result, fields) {
        if (err) throw err;{
            console.log("Table Details_______________________________________")
            console.log(result);
            console.log("\n")
        }
    });
  }
});