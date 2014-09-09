// mobile model
var config   = require("../../config");
var mongoose = require("mongoose");
mongoose.connect(config.production.DB_URI);
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var TimesSchema = new Schema({
  dt : Number
});
var dbTimes = mongoose.model("times", TimesSchema);

exports.index = function(callback) {
  var newUser = new dbTimes({ dt: new Date().getTime() });
  newUser.save(function(err){
    if (err) {
      return callback({ret: 2});
    }
    dbTimes.count({}, function(err, times){
      if (err) {
        return callback({ret: 2});
      }
      dbTimes.count({dt: {$gt: new Date().getTime()-30*60*1000}} ,function(err, users){
        if (err) {
          return callback({ret: 2});
        }
        return callback({ret: 1, times: times+12030, users: users});
      });
    });
  });
};
