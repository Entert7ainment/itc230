
'use strict'
 
const express = require("express");
const app = express();

var lyric=require("./lyric/music");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 let show=lyric.getAll();
 res.render('home',{music:show, title:show.title});
//res.sendFile(__dirname + '/public/home.html'); 
});

// send plain text response
app.get('/get', function(req,res){
 res.type('text/plain');
 let header = 'Searching for music:'+ req.query.title;
 let found = lyric.get(req.query.title);
 res.render('details', {title: req.query.title, result: found, pageheader: header});
 //res.send('About page');
});

app.get('/about', function(req,res){
 res.type('test/html');
 res.render('about');
});

// send content of 'home' view, //change body to queron let result & res.render
app.post('/get', function(req,res){
 let header = 'Searching for music' + req.body.title;
 let found =lyric.get(req.body.title);
 
 //let result = lyric.get(req.query.title);
 //res.render('details', {title: req.query.title, result: result });
});

app.get('/delete', function(req,res){
 let result = lyric.delete(req.query.title);
 //var remove = lyric.delete(req.body.title);
 console.log(result.total);
 res.render('delete', {title: req.body.title, result: result});
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



