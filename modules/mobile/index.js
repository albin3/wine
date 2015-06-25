// mobile routers
var view = require('./view');

exports.init = function(app) {
  app.get('/mobile', view.index);
  app.get('/mianmo', view.mianmo);
  app.get('/test', view.test);
  app.get('/road', view.road);
  app.get('/around', view.around);
  app.get('/shake', view.shake);
  app.get('/youxi', view.youxi);
  app.get('/life', view.life);
  app.get('/life3', view.life3);
  app.get('/good', view.good);
};
