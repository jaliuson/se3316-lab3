const express = require('express');

const newConnection = require('./DBConnection');

const app = express();

isAdmin = false;
editee = 0;

//STATIC CONTENT--------------------------------------------------------------------------------------------
app.use(express.static('static'));

//DYNAMIC CONTENT-------------------------------------------------------------------------------------------

//For admin login
app.get('/adminLogin', (req,res) => {
    if((req.query.un) == "admin" && (req.query.pw) == "1234"){
        isAdmin = true;
        res.redirect('/viewAvailability');        
    }
})

//For guest login
app.get('/guestLogin', (req,res) => {
        isAdmin = false;
        guestName = req.query.un;
        res.redirect('/guestView');        
})

//Adming app page
app.get('/adminView', (req, res) => {
    x = req.query.editee; //row to be edited
    res.sendFile(__dirname + '/static/adminApp.html');
  })

//Guest app page
app.get('/guestView', (req,res) => {
    res.sendFile(__dirname + '/static/guestApp.html');
})

//Handle guest submission\

app.get('/submitAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();
    let times = [req.query.t1 , req.query.t2 , req.query.t3 , req.query.t4 , req.query.t5 , req.query.t6 , req.query.t7 , req.query.t8 , req.query.t9 , req.query.t10]
    conn.query(`INSERT INTO Doodles VALUES ('${req.query.personName}','${times[0]}','${times[1]}','${times[2]}','${times[3]}','${times[4]}','${times[5]}','${times[6]}','${times[7]}','${times[8]}','${times[9]}')`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
                res.redirect("/viewAvailability")
            });       
    conn.end();
})

//view times
app.use(express.urlencoded({
    extended: true
}))

app.get('/viewAvailability', (req,res) => {
    let conn=newConnection();
    conn.connect();
    let entriesList;
    conn.query(`select * from Doodles`, (err,rows,fields) => {
        if (err)
            res.send('ERROR: ' +err)
        else
        {
            entriesList = rows;
            let content ='<h1>Current Availabilities</h1>';
            content += '<table style="width:100%;border:1px solid black;align">'
            content += "<tr><th>#</th><th>Name</th><th>T1</th><th>T2</th><th>T3</th><th>T4</th><th>T5</th><th>T6</th><th>T7</th><th>T8</th><th>T9</th><th>T10</th></tr>"
            let rowCount = 1;
            for (p of entriesList)
            {
                content += "<tr><td style='border:1px solid black'>" + rowCount + "</td>"
                rowCount++
                let times = [p.T1 , p.T2, p.T3 , p.T4, p.T5 , p.T6, p.T7 , p.T8, p.T9, p.T10]
                content += "<td style='border:1px solid black'>"
                content += p.person
                content += "</td>"
                for(let i=0 ; i<times.length ; i++){
                    
                    if(times[i] == 'on'){
                        content += "<td style='background-color:#91d18a ; border:1px solid black'>"
                        content += 'available'
                    }
                    else{  
                        content += "<td style='background-color:#d18a8a ; border:1px solid black'>"
                        content += 'unavailable'
                    }
                    content += "</td>"
                }
                content += "</tr>"
            }
            content += "</table>"
            content += `<form action="/goHome">
            <input type="submit" value="Go Home">
            </form>`
            
            if(isAdmin){
                content += (`
                <form action="/guestView">
                    <input type="submit" value="Set Availability">
                </form>

                <form action="/adminView">
                    <input type="submit" value="Edit Availability">
                </form>`)
            }

            res.send(content);
        }
    })    
    conn.end();
})

//Edit a specific row
app.get('/editRow', (req, res) => {
    let conn = newConnection();
    conn.connect();
    let times = [req.query.t1 , req.query.t2 , req.query.t3 , req.query.t4 , req.query.t5 , req.query.t6 , req.query.t7 , req.query.t8 , req.query.t9 , req.query.t10]
    conn.query(`UPDATE Doodles SET T1='${times[0]}',T2='${times[1]}',T3='${times[2]}',T4='${times[3]}',T5='${times[4]}',T6='${times[5]}',T7='${times[6]}',T8='${times[7]}',T9='${times[8]}',T10='${times[9]}' WHERE person = '${req.query.eName}'`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row changed');
                res.redirect("/viewAvailability")
            });       
    conn.end();
  })

//Return to homepage
app.get('/goHome', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');

    
  })

//APP PORT--------------------------------------------------------------------------------------------------
app.listen(1020);