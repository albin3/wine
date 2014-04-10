var mongoose = require('mongoose'),
    config = require('../config')['testing'],
    init_app = require('../app').init_app;

exports.app = init_app(config);

beforeEach(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    return done();
  }

  function reconnect() {
    mongoose.connect(app.config.db_url, function(err) {
      if (err) throw err;
      return clearDB();
    });
  }

  function checkState() {
    switch (mongoose.connection.readyState) {
      case 0:
        reconnect();
        break;
      case 1:
        clearDB();
        break;
      default:
        process.nextTick(checkState);
    }
  }

  checkState();
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});
