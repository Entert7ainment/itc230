
'use strict'
 
const express = require("express");
const app = express();

var lyric=require("./lyric/music");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

// send plain text response
app.get('/about', function(req,res){
 res.type('text/plain');
 res.send('About page');
});

// send content of 'home' view
app.post('/get', function(req,res){
 let result = lyric.get(req.body.title);
 res.render('details', {title: req.body.title, result: result });
});

app.get('/delete', function(req,res){
 var remove = lyric.delete(req.query.title);
 console.log(remove);
 res.render('delete', {title: req.query.title, result: remove});
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started'); 
});
