var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    password_hash = require('password-hash');

/**
 * User Schema
 */
var UserSchema = exports.UserSchema = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, index: { unique: true }, default: '' }
});

UserSchema.pre('save', function(next) {
  this.password = password_hash.generate(this.password);
  next();
})

UserSchema.methods = {
  authenticate: function(password) {
    return password_hash.verify(password, this.password);
  }
};

exports.User = mongoose.model('User', UserSchema);
