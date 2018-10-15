var express = require('express');
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var DB = require('./mydb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://mimonenew:mimonenewpass@www.epocum.com:27017/admin';

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

app.get('/addPersone', function(req, res, next) {
	
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


app.use(express.static('.' + '/'));
http.createServer(app).listen(80);
