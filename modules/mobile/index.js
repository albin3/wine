// mobile routers
var view = require('./view');

exports.init = function(app) {
  app.get('/mobile', view.index);
  app.get('/test', view.test);
  app.get('/road', view.road);
  app.get('/around', view.around);
  app.get('/shake', view.shake);
};
