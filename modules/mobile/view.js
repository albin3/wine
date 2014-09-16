// mobile view
var model = require('./model');

exports.index = function(req, res) {
  model.index(function(data){
    if (data.ret !== 1)
      res.render('mobile/index');
    else 
      res.render('mobile/index', {totalTimes: data.times, onlineUsers: data.users});
  });
};

exports.mianmo = function(req, res) {
  res.render('mobile/mianmo');
};

exports.test = function(req, res) {
  res.render('mobile/test');
};

exports.road = function(req, res) {
  res.render('mobile/road');
};

exports.around = function(req, res) {
  res.render('mobile/around');
};

exports.shake = function(req, res) {
  res.render('mobile/shake');
};

exports.youxi = function(req, res) {
  res.render('mobile/youxi');
};
