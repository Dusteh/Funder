var express = require('express');
var app = express();


app.use(express.static(__dirname+'/pages'));

//app.get("/",function(req,res){
//        
//});

app.listen(process.env.PORT,process.env.IP);