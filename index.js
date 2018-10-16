var express = require('express');
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var DB = require('./mydb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user:pass@www.host.com:27017/db';

var app = express();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true,
                            cookie: { maxAge : 200000000 }
					 }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/getPersone', function(req, res, next) {
	
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("admin");
	  dbo.collection("persone").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    res.json(result);
	    db.close();
	  });
	}); 
	
});

app.all('/test1', function(request, response) {

	var content = fs.readFileSync('.' +'/test/test1.html', 'utf-8');
	var compiled = ejs.compile(content);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(compiled({
    	//id: id,
    	//name: name,
	//codice: ''

    }));


});


app.all('/test2', function(request, response) {

	var content = fs.readFileSync('.' +'/test/test2.html', 'utf-8');
	var compiled = ejs.compile(content);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(compiled({
    	//id: id,
    	//name: name,
	//codice: ''

    }));


});


app.all('/test2', function(request, response) {

	var content = fs.readFileSync('.' +'/test/test2.html', 'utf-8');
	var compiled = ejs.compile(content);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(compiled({    }));
});

app.get('/add_persona/:nome/phones/:phones/active/:isactive', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
		DB.addMe(req.params.nome,req.params.phones,req.params.isactive);
		res.json('_<OK>_');
	});
	
});

app.get('/upd_persona/:nome/phones/:phones/active/:isactive', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
		DB.updateMe(req.params.nome,req.params.phones,req.params.isactive);
		res.json('_<OK>_');
	});
	
});


app.use(express.static('.' + '/'));
http.createServer(app).listen(80);
