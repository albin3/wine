var require_login = require('current-user').require_login,
    views = require('./views'),
    forms = require('./forms');

exports.init = function(app) {
  app.get('/u/signin', views.signin);
  app.post('/u/signin', forms.signin_form, views.signin);
  app.get('/u/signup', views.signup);
  app.post('/u/signup', forms.signup_form, views.signup);
  app.get('/u/signout', require_login, views.signout);
};
