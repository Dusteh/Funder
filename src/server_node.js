var http = require("http");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end("<html><head/><body><h1>Hello World!</h1></body></html>");
}).listen(80,'localhost');
console.log('Server running at http://localhost');