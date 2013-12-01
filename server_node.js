var express = require('express');
var everyAuth = require('everyauth');
var fs = require('fs');
var app = express();

app.use(express.logger('dev'));
app.use(express.favicon());

/***************************
Session Handler
***************************/
app.use(express.cookieParser('e129cfc821bfd9069813db0467eeca08'));
app.use(express.cookieSession());
/***************************/

var appParametersCache = {
    // howFAQ:{
    //     date:(new Date()),
    //     expireDate:(new Date()).setHours((new Date()).getHours()+3),
    //     data:null
    // }
}

var MINUTE = (1000*60);
var HOUR = (MINUTE*60);
var DAY = (HOUR * 24);

app.use(express.static(__dirname+'/client_components'));
app.use(express.static(__dirname+'/client_components/third_party_assets'));
app.use(express.static(__dirname+"/client_components/assets"));

app.use(express.bodyParser());

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
    var qa = appParametersCache.howFAQ;    
    if(qa == null || qa.date.getTime()>qa.expireDate.getTime()){//Fetch the QA from the file system
        var tmpQA = null;
        try{
            tmpQA = fs.readFileSync(__dirname+'/resources/faq.json',"UTF-8");
        }catch(err){
            console.log("Error occured: "+err);
        }
        if(tmpQA != null){
            tmpQA = JSON.parse(tmpQA);
            qa = setApplicationCacheVariable("howFAQ",tmpQA,MINUTE*120);            
        }
    }
	res.end(JSON.stringify({qa:qa.data}));
});

app.get("/login",function(req,res,next){
    console.log('/login post');
    var login = loginCheck(req,res);
	res.end(JSON.stringify(login));
});

app.post("/login",function(req,res,next){
    console.log('/login post');
    var login = loginCheck(req,res);
    res.end(JSON.stringify(login));
});

app.get("/logout",function(req,res,next){
    console.log("/logout use");
    res.clearCookie("login");
    res.redirect("/"); 
});

app.get("/*",function(req,res,next){
    console.log("In wildcard");
    console.log(req.path); 
    res.redirect("/");
});








//Finalize Startup
if(process.env.PORT === undefined || process.env.IP === undefined){
	console.log('Listening on 8080');
	app.listen(8080);
}else{
	console.log('Listening at '+process.env.IP+' on '+process.env.PORT);
	app.listen(process.env.PORT,process.env.IP);
}

var setApplicationCacheVariable = function(name,data,expiry){
    appParametersCache[name] = {
        date:new Date(),
        expireDate:new Date((new Date()).setTime((new Date()).getTime()+expiry)),
        data:data
    };
    return appParametersCache[name];
};

var loginCheck = function(req,res){    
    var login = req.signedCookies.login;
    

    if(login === null || login === undefined){
        //hmmm no cookie, names perhaps?        
        
        var userName = req.body.userName;
        var password = req.body.password;
        if(!auth(userName,password)){
            return {error:'No valid login'};
        }
        login = getUser(userName);
        login = {
            expireDate:createExpireDate(DAY*30),
            data:login
        }
        res.cookie(login,{signed:true});
    }
    console.log("Login: "+JSON.stringify(login));
    //Check the time expiration
    if(login.expireDate === null || login.expireDate === undefined || (new Date()).getTime() > login.expireDate.getTime()){
        //Remove the cookie
        res.clearCookie("login");
        return {error:'Login expired'};
    }
    
    return login.data;
};


var auth = function(username,password){
    //do auth
    console.log("Username: "+username);
    if(username !== null && password !== null && username !== undefined && password !== undefined){
        return true;
    }
    return false;
}

var getUser = function(userName){
    return {
        loggedIn:true,
        firstName:'Dusty',
        lastName:'Hittenmiller',
        username:'Dusteh'      
    };
}

var createExpireDate = function(timeToAdd){
    return new Date((new Date()).setTime(new Date().getTime()+timeToAdd));
}
