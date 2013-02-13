var express = require('express');
var app = express();

app.use(express.logger('dev'));

app.use(express.static(__dirname+'/client_components'));
app.use(express.static(__dirname+'/client_components/third_party_assets'));
app.use(express.static(__dirname+"/client_components/assets"));

app.use(function(req,res,next){
    console.log('Router handler is:'+ req.url);    
    next();
})


app.listen(process.env.PORT,process.env.IP);