const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const isEmail = require('validator/lib/isEmail');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const { WRONG_EMAIL_OR_PASSWORD } = require('../constants/constants');

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userschema.statics.findUserByCredentials = function Login(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationRequired(WRONG_EMAIL_OR_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationRequired(WRONG_EMAIL_OR_PASSWORD));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('users', userschema);
