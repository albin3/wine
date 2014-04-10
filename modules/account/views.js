var User = require('./models').User;

exports.signin = function(req, res) {
  if (req.method === 'GET') return res.render('account/signin');

  if (!req.form.isValid)
    return res.render('account/signin', { errors: req.form.getErrors() });

  User.findOne({ email: req.form.email }, function(err, user) {
    if (err || !user || !user.authenticate(req.form.password)) throw new Error();
    req.login_user(user);
    req.flash('Successfully signed in.');
    res.redirect('/');
  });
};

exports.signup = function(req, res) {
  if (req.method === 'GET') return res.render('account/signup');

  if (!req.form.isValid)
    return res.render('account/signup', { errors: req.form.getErrors() });

  var user = new User(req.form);
  user.save(function(err) {
    if (err) throw new Error();
    else {
      req.flash('Successfully signed up.');
      res.redirect('/u/signin');
    }
  });
};

exports.signout = function(req, res) {
  req.logout_user();
  res.redirect('/u/signin');
};
