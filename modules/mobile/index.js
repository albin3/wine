// mobile routers
var view = require('./view');

exports.init = function(app) {
  app.get('/mobile', view.index);
  app.get('/test', view.test);
  app.get('/road', view.road);
  app.get('/shake', view.shake);
  app.get('/api/get-data', view.getdata);
};