const mysql = require('mysql');

function newConnection()
{
    let conn = mysql.createConnection({
        host:'104.197.153.127',
        user: 'root',
        password:'8898',
        database:'usersDB'
    });
    return conn;
}
module.exports = newConnection;

