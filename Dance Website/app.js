const express = require("express");
const app = express();
// const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = 9000;

// MONGOOSE SPECIFIC
mongoose.connect('mongodb://127.0.0.1:27017/DanceContact', {useNewUrlParser : true, useUnifiedTopology : true});

// CREATE SCHEMA 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// CREATE MODEL 
const Contact = mongoose.model('Contact', contactSchema);



// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));

// PUG SPECIFIC CONFIGURATION
app.set('view-engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req,res)=>{
    const params = {'title':"Dance Website"};
    res.status(200).render('home.pug');
})

app.get('/contact', (req,res)=>{
    const params = {'title':"Dance Website"};
    res.status(200).render('contact.pug',{success:''});
})


// BODY PARSER SPECIFIC CONFIGURATION

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.status(200).render('contact.pug',{success:"The data has been stored in the database successfully!"});
    }).catch(()=>{
    res.status(400).render('contact.pug', {error:"The data has not been stored!"});
   })
})

// START THE Server
app.listen(port, ()=>{
    console.log(`The application started successfully on server: 127.0.0.1:${port}/`);
});