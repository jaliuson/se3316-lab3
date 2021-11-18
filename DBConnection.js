const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'104.154.137.46',
        user: 'root',
        password:'8898',
        database:'usersDB'
    });
    return conn;
}
module.exports = newConnection;

