const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('mongoose-validators');
const bcrypt = require('bcrypt');
const secret = require('../../config').auth.secret;
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({ 
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    lowercase: true,
    validate: validators.isEmail()
  },
  password: { type: String, required: true },
  bio: String,
  age: Number,
  name: String,
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        return next(err);
      }
      /*bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
      })*/;
        next();
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
