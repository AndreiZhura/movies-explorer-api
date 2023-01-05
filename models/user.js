const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const  isEmail  = require('validator/lib/isEmail');
const AuthorizationRequired = require('../errors/AuthorizationRequired');

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
  }
});

userschema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('users',userschema);
