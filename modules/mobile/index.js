// mobile routers
var view = require('./view');

exports.init = function(app) {
  app.get('/mobile', view.index);
  app.get('/test', view.test);
  app.get('/api/get-data', view.getdata);
};
