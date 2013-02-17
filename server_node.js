var express = require('express');
var everyAuth = require('everyauth');
var app = express();

app.use(express.logger('dev'));
app.use(express.favicon());

/***************************
Session Handler
***************************/
app.use(express.cookieParser('e129cfc821bfd9069813db0467eeca08'));
app.use(express.cookieSession());
/***************************/


app.use(express.static(__dirname+'/client_components'));
app.use(express.static(__dirname+'/client_components/third_party_assets'));
app.use(express.static(__dirname+"/client_components/assets"));


app.get("/menu",function(req,res,next){
	console.log('/menu get');
	res.end(JSON.stringify([{}]));
});

app.get("/",function(req,res,next){
	console.log('/ get');
	res.end(JSON.stringify([{}]));
});

app.get("/home",function(req,res,next){
	console.log('/ get');
	res.end(JSON.stringify([{}]));
});

app.get("/project",function(req,res,next){
	console.log('/project get');
	res.end(JSON.stringify([{}]));
});

app.get("/search",function(req,res,next){
	console.log('/search get');
	res.end(JSON.stringify([{}]));
});

app.get("/how",function(req,res,next){
	console.log('/how get');
	res.end(JSON.stringify([{}]));
});

app.post("/login",function(req,res,next){
	console.log('/login post');
	res.end(JSON.stringify({
		loggedIn:true,
		firstName:'Dusty',
		lastName:'Hittenmiller',
		username:'Dusteh'
	}));
});

//Finalize Startup


if(process.env.PORT == undefined || process.env.IP == undefined){
	console.log('Listening on 8080');
	app.listen(8080);
}else{
	console.log('Listening at '+process.env.IP+' on '+process.env.PORT);
	app.listen(process.env.PORT,process.env.IP);
}
