'use strict'
 
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

//var lyric=require("./lyric/music");
var Lyric =require("./models/music");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());
app.use('/api', require('cors')());
app.use((err, req, res, next) => {
  console.log(err);
});

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");

app.get('/', (req,res)=>{
   Lyric.find((err, lyric)=>{
       if(err) return next(err);
       res.render('home', {music:JSON.stringify(lyric)});
   })   
})
 
app.get('/about', (req,res)=>{
    res.type('text/html');
    res.render('about');
});
 

app.get('/api/v1/lyric', (req,res,next)=>{
    Lyric.find({},(err, lyric)=>{              
    
    if(err||!lyric)
    {
      return next(err);
    }
    else
    {
        res.json(lyric);
    }  
        
    });    
});
 
app.post('/api/v1/lyric/:title', (req,res,next)=>{
Lyric.findOne({title: req.body.title},(err, lyric)=>{     
   if(err||!lyric)
   {
        return next(err);
    }
    
    else
    {
        res.json(lyric);
    }   
    
    });      
});
 
 
app.get('/api/v1/delete/:id', (req,res, next)=>{    
   Lyric.remove({_id: req.params.id},(err, result)=>{  
        
        if(err)
    {
       return next (err);
    } 
        
    else
    {
        //console.log(result)
        res.json({deleted: result.result.n});   
    }                                                                     
            });                             
    });
 
app.get('/api/v1/lyric/:title', (req,res,next)=>{
   Lyric.findOne({title: req.params.title},(err, lyric)=>{     
   if(err||!lyric)
   {
        return next(err);
    }
    
    else
    {
        res.json(lyric);
    }   
    
    });      
});
 
app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    //console.log('/api/v1/add/');
    console.log(req.body);
    if (!req.body._id) { // insert new document        
        let lyric = new Lyric({title:req.body.title, author: req.body.author, pubDate: req.body.pubDate});
       lyric.save((err,newLyric) => {
            if (err) return next(err);
            console.log(newLyric)
            res.json({updated: 0, _id: newLyric._id});
        });
    } else { // update existing document
    console.log(req.body);
        Lyric.updateOne({ _id: req.body._id},{title:req.body.title, author: req.body.author,pubDate: req.body.pubDate },(err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});
 
 
app.get('/api/v1/add/:title/:author/:pubDate', (req,res,next)=>{
 
let title=req.params.title;
Lyric.update({title: title}, {title:title, author: req.params.author, pubDate: req.params.pubDate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});
 
      
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});
 
app.listen(app.get('port'), function() {
    console.log('Express started');    
});
 
 




/*
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
 res.type('text/html');
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
    Lyric.remove({title: req.query.title},(err, music)=>{             
    if (err) return next(err);                                  
 Lyric.count({},(err,count)=>{
   
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: {deleted: true, total: count}});  
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
*/


