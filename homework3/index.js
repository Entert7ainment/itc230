'use strict'

let music=require("./lyric/music");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/delete', function(req,res){    
    let result= music.delete(req.query.title); 
    console.log(result.totalremain);
    res.render('delete', {title: req.query.title, result: result});   
});

app.post('/get', function(req,res){
    let header = 'Searching for the movie: ' + req.body.title;
    let found = music.get(req.body.title);
    res.render('details', {title: req.body.title, result: found, pageheader: header});
});

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});
