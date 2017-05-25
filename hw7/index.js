'use strict'
 
const express = require("express");
const app = express();

//var lyric=require("./lyric/music");
var Lyric =require("./models/music");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

app.use('/api', require('cors')());

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout:'main'}));
app.set("view engine", ".html");



//api routes begins
app.get('/api/v1/lyric', (req,res)=>{
    Lyric.find({},(err, lyric)=>{              
    
    if(lyric)
    {
        res.json(lyric);
    }
    else
    {
        res.status(404).send('404 Error');
    }  
        
    });    
});

app.post('/api/v1/lyric/:title', (req,res)=>{
Lyric.findOne({title: req.params.title},(err, lyric)=>{     
   if(lyric)
   {
        res.json(lyric);
    }
    
    else
    {
        res.status(404).send('404 Error');
    }   
    
    });      
});


app.get('/api/v1/lyric/delete/:title', (req,res)=>{    
    Lyric.remove({title: req.params.title},(err, result)=>{  
        
        if(err)
    {
        res.status(404).send('404 Error');
    } 
        
    else
    {
        //console.log(result)
        res.json({deleted: result.result.n});   
    }                                                                     
            });                             
    });

app.get('/api/v1/lyric/:title', (req,res)=>{
   Lyric.findOne({title: req.params.title},(err, lyric)=>{     
   if(lyric)
   {
        res.json(lyric);
   }
    else
    {
        res.status(404).send('404 Error');
    }  
        
    });      
});

app.get('/api/v1/lyric/add/:title/:author?/:pubDate?', (req,res)=>{
console.log(req.params);
let author = req.params.author || "";
let pubDate = req.params.pubDate || "";

var lyric=new Lyric({title: req.params.title,author:author,pubDate: pubDate}); 
lyric.save(lyric, (err,result)=>{        
       
    if(err)
   {
     res.status(404).send('404 Error');
   }
    else
    {
    //console.log(result);
    res.json({added: result});
     
    }
    });      
});

// api routes ends    

app.get('/', (req,res)=>{
Lyric.find({},(err, music)=>{
 if (err) return next(err);
 res.type('text/html');
 //let show=lyric.getAll();
 res.render('home',{music:music});
});
//res.sendFile(__dirname + '/public/home.html'); 
});

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


app.get('/delete', (req,res)=>{    
    Lyric.remove({title: req.query.title},(err, music)=>{             
    if (err) return next(err);                                  
 Lyric.count({},(err,count)=>{
   if(err) return next(err);
    if(count==0){  
    res.type('text/html'); 
    res.render('delete', {title: req.query.title, result: 'zero'});  
    }else{   
 res.render('delete', {title: req.query.title, result: count});
    }
        })  
            });                             
    });


// send plain text response
app.get('/get', (req,res)=>{
    Lyric.findOne({title: req.query.title},(err, music)=>{     
    if (err) return next(err);                                  
    res.type('text/html');  
    res.render('details', {title: req.query.title, result:music,pageheader: 'Searching for music:'+req.query.title});    
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


