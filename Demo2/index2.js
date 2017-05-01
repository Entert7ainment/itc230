var http = require("http"), fs = require("fs"),
qs=require("querystring"), books=require("./kir/books");


function serveStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
        fs.readFile(__dirname + path, function(err,data) {
    if(err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
 } else {
 res.writeHead(responseCode,
 { 'Content-Type': contentType });
 res.end(data);
 }
 });
}
http.createServer(function(req,res){
   var url = req.url.split("?")
    console.log(url)
    
 var params = qs.parse(url[1]);
    console.log(params)
    
 var path = url[0].toLowerCase();
 switch(path) {
 case '/':
 serveStaticFile(res, '/public/home.html', 'text/html');
 break;
         
 case '/about':
 serveStaticFile(res, '/public/about.html', 'text/html');
 break;
         case '/search':
         var book = books.get(params.title)
         res.writeHead(200, {'Content-Type': 'text/plain'});
         res.end(JSON.stringify(book));
 break;
         case '/add':
 serveStaticFile(res, '/public/add.html', 'text/html');
 break;
 
 default:
 serveStaticFile(res, '/public/404.html', 'text/html',
 404);
 break;
 }

}).listen(process.env.PORT || 3000);
