var mysql = require('mysql');

let conn = mysql.createConnection({
    host:'104.154.137.46',
    user: 'root',
    password:'8898',
    database:'usersDB'
});

conn.connect(function(err) {
  if (err) throw err;
  conn.query("DROP TABLE Product", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});