const bcrypt = require("bcryptjs"); // импортируем bcrypt
const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken
const Auth = require("../models/user");
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
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        throw new Conflict('Такой пользователь уже существует!');
      } else {
        return bcrypt.hash(password, SALT_ROUND);
      }
    })
    .then((hash) => users.create({
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
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return Auth.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" } // токен будет просрочен через 7 дней после создания
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
