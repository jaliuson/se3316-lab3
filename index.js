const express = require('express');

const newConnection = require('./DBConnection');

const app = express();

//STATIC CONTENT--------------------------------------------------------------------------------------------
app.use(express.static('static'));

//DYNAMIC CONTENT-------------------------------------------------------------------------------------------

//For admin login
app.get('/adminLogin', (req,res) => {
    if((req.query.un) == "admin" && (req.query.pw) == "1234"){
        res.redirect('/adminView');        
    }
})

//For guest login
app.get('/guestLogin', (req,res) => {
        guestName = req.query.un;
        res.redirect('/guestView');        
})

//Adming app page
app.get('/adminView', (req, res) => {
    res.sendFile(__dirname + '/static/adminApp.html');
  })

//Guest app page
app.get('/guestView', (req,res) => {
    res.sendFile(__dirname + '/static/guestApp.html');
})

//Handle guest submission\

app.get('/submitAvailability', (req,res) => {
    
})

//APP PORT--------------------------------------------------------------------------------------------------
app.listen(1020);