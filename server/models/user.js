const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  var token = jwt.sign({ _id: user._id.toHexString(), access: access }, 'abc123').toString();

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
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this; // Model method is called with model as this binding
  
  return User.findOne({email}).then((user) => {
    if (!user) {
      Promise.reject();
    }
console.log('user found')
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  })
}

// Mongoose middleWare, we are doing some processing before 'save' event
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = { User };