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
                        console.log('Table Dropped*****');
                }
            )

//CREATE TABLE COLUMNS---------------------------------------------------------
conn.query(`CREATE TABLE Doodles (person varchar(100),T1 varchar(100),T2 varchar(100),T3 varchar(100),T4 varchar(100),T5 varchar(100),T6 varchar(100),T7 varchar(100),T8 varchar(100),T9 varchar(100),T10 varchar(100))` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created*****');
            })

//Load sample tuple
conn.query( `INSERT INTO Doodles VALUES ("jason","on","on","on","on","on","on","on","on","on","on")`
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

conn.end();
