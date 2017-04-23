var http = require("http");  
http.createServer(function(req,res) 

{
    
  res.writeHead(200, {'Content-Type': 'text/plain'});
    var path = req.url.toLowerCase() 
  res.end('Aloha world');
}).listen(process.env.PORT || 3000);``
