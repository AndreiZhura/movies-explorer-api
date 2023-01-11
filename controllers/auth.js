const { SECRET_KEY_JWT, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const Auth = require('../models/user');
const { SALT_ROUND } = require('../constants/constants');
const ErrorCode = require('../errors/ErrorCode');
const Conflict = require('../errors/Conflict');
// КОНСТАНТЫ ОШИБОК
const { THIS_USER_ALREADY_EXISTS, INCORRECT_DATA_ENTERED } = require('../constants/constants');
// создаёт пользователя с переданными в теле
// email, password и name
module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  const { email, password, name } = req.body;

  Auth.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(THIS_USER_ALREADY_EXISTS);
      }
      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => Auth.create({
      email,
      password: hash, // записываем хеш в базу
      name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(INCORRECT_DATA_ENTERED));
      } else {
        next(err);
      }
    });
};

// проверяет переданные в теле почту и пароль
// и возвращает JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Auth.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY_JWT : 'dev-secret',
        { expiresIn: '7d' },
        // токен будет просрочен через 7 дней после создания
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
