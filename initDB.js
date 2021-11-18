const mysql = require('mysql');

let conn = mysql.createConnection({
    host:'104.154.137.46',
    user: 'root',
    password:'8898',
    database:'usersDB'
});

conn.connect();

conn.query(`Drop Table Product`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )
conn.query(`CREATE TABLE Product
            (
                Description varchar(100),
                Price   Dec(6,3),
                imgPath varchar(100)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
// {"desc":"Table","price":"200","imgPath":"/imgs/Table.jpg"}
conn.query( `insert into Product values ("Table",200,"/imgs/Table.jpg")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `select * from Product `
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                for (r of rows)
                    console.log(r);
            });

conn.end();
