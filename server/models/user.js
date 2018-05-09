const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

// Adding instance method
UserSchema.methods.generateAuthToken = function () {
  var user = this; // Instance method is called with individual document
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{
    access: access,
    token: token
  }]);

  return user.save().then(() => {
    return token;
  });
}

// Adding model method
UserSchema.statics.findByToken = function (token) {
  var User = this; // Model method is called with model as this binding
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

var User = mongoose.model('User', UserSchema);

module.exports = {User};