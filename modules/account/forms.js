var form = require('express-form'),
    field = form.field,
    User = require('./models').User;

function email_unique(email, source, callback) {
  User.findOne({ email: email }, function(err, user) {
    if (err) throw new Error();
    if (user) return callback(new Error('This email address has been token'));
    callback(null);
  });
}

function account_exist(email, source, callback) {
  User.findOne({ email: email }, function(err, user) {
    if (err) throw new Error();
    if (!user) return callback(new Error('Account not exist'));
    callback(null);
  });
}

function is_password_correct(password, source, callback) {
  User.findOne({ email: source.email }, function(err, user) {
    if (err || !user) throw new Error();
    if (!user.authenticate(password)) return callback(new Error('Wrong password'));
    callback(null);
  });
}

exports.signup_form = form(
  field('email').trim().required().isEmail().custom(email_unique),
  field('username').trim().required(),
  field('password').trim().required().minLength(6),
  field('password_confirm').trim().required().equals('field::password', 'Password not matched')
);

exports.signin_form = form(
  field('email').trim().required().isEmail().custom(account_exist),
  field('password').trim().required().custom(is_password_correct)
);
