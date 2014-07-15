var config    = require('../config'),
    MongoClient = require('mongodb'),
    mongojs = require('mongojs');
var db = mongojs("wine");
var dbtimes = db.collection('times');

dbtimes.count(function(err, count){
  if (err) {
    console.log(err);
    return ;
  }
  return console.log(count);
});

