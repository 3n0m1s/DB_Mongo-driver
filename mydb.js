var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://mimonenew:mimonenewpass@www.epocum.com:27017/admin';

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
 
 if (err) throw err;
   var dbo = db.db("admin");
	dbo.createCollection("persone", function(err, res) {
    if (err) throw err;
    console.log("Collection ok!");
  });

});

var addMe = function(name,phones,isactive,db, callback) {
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("admin");
  var meAsFriend = {Name: coinbase, Phones: phones, isActive:isactive};
  dbo.collection("persone").insertOne(meAsFriend, function(err, res) {
    if (err) throw err;
    console.log("1 persona inserita");
    db.close();
  });
});
}
exports.addMe = addMe;

var updateMe = function(name,phones,isactive, callback) {
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("admin");
  var post = {Name:name, Phones: phones, isActive: isactive};
  dbo.collection("persone").insertOne(post, function(err, res) {
    if (err) throw err;
    console.log("1 persona aggiornata");
    db.close();
  });
});
}
exports.updateMe = updateMe;

