var http = require("http");  
http.createServer(function(req,res) 
                  
{
    console.log("url="+req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
    if(req.url=="/help"){
       res.end('do you need help?'); 
    }else{
        res.end('Home page');
    }
  res.end('Aloha world');
}).listen(process.env.PORT || 3000);
