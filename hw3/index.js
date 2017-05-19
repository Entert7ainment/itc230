'use strict'
 
const express = require("express");
const app = express();

//var lyric=require("./lyric/music");
var Lyric =require("./models/music");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req,res)=>{
Lyric.find({},(err, music)=>{
 if (err) return next(err);
 res.type('text/html');
 //let show=lyric.getAll();
 res.render('home',{music:music});
});
//res.sendFile(__dirname + '/public/home.html'); 
});

// send plain text response
app.get('/get', (req,res)=>{
    Lyric.findOne({title: req.query.title},(err, music)=>{     
    if (err) return next(err);                                  
    res.type('text/html');  
    res.render('details', {title: req.query.title, result:music,pageheader: 'Searching for music:'+req.query.title});    
    });      
});
 //res.type('text/plain');
 //let header = 'Searching for music:'+ req.query.title;
 //let found = lyric.get(req.query.title);

 //res.send('About page');


app.get('/about', (req,res)=>{
 res.type('test/html');
 res.render('about');
});

// send content of 'home' view, //change body to queron let result & res.render
app.post('/get', (req,res)=>{
     Lyric.findOne({title: req.body.title},(err, music)=>{     
   if (err) return next(err);   
    res.type('text/html');  
    res.render('details', {title: req.body.title, result:music,pageheader: 'Searching for music'+req.body.title});    
    });      
});

 //let header = 'Searching for music' + req.body.title;
 //let found =lyric.get(req.body.title);
 
 //let result = lyric.get(req.query.title);
 //res.render('details', {title: req.query.title, result: result });


app.get('/delete', (req,res)=>{    
    Lyric.findOneAndRemove({title: req.query.title},(err, music)=>{             
    if (err) return next(err);                                  
 Lyric.count({},(err,count)=>{
   
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: count});  
        })  
            });                             
    });
// define 404 handler
app.use((req,res) =>{
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started'); 
});



