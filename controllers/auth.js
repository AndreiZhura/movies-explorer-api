const bcrypt = require("bcryptjs"); // импортируем bcrypt
const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken
const Auth = require("../models/user");
const { SALT_ROUND, SECRET_KEY_JWT } = require('../constants/constants');
const ErrorCode = require('../errors/ErrorCode');
const Conflict = require('../errors/Conflict');

// создаёт пользователя с переданными в теле
// email, password и name
module.exports.createUser = (req, res, next) => {
  // хешируем пароль
  const {
    email, password, name,
  } = req.body;

  Auth
    .findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Такой пользователь уже существует!');
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
        next(new ErrorCode('введены некоректные данные'));
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
        SECRET_KEY_JWT,
        { expiresIn: "7d" } // токен будет просрочен через 7 дней после создания
      );
      res.send({ token });
    })
      .catch((err) => {
      next(err);
    });
};
