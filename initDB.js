const mysql = require('mysql');

let conn = mysql.createConnection({ //GCP DB connection
    host:'104.154.137.46',
    user: 'root',
    password:'8898',
    database:'usersDB'
});

conn.connect();

//DELETE EXISTING TABLE DATA---------------------------------------------------
conn.query(`DROP TABLE Doodles`, 
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )

//CREATE TABLE COLUMNS---------------------------------------------------------
conn.query(`CREATE TABLE Doodles (person varchar(100),T1 varchar(1),T2 varchar(1),T3 varchar(1),T4 varchar(1),T5 varchar(1),T6 varchar(1),T7 varchar(1),T8 varchar(1),T9 varchar(1),T10 varchar(1))` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
/*
// {"desc":"Table","price":"200","imgPath":"/imgs/Table.jpg"}
conn.query( `INSERT INTO Doodles VALUES ("Table",200,"/imgs/Table.jpg")`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `SELECT * FROM Doodles `
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                for (r of rows)
                    console.log(r);
            });
*/
conn.end();
