const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const Auth = require('../models/user');

// создаёт пользователя с переданными в теле
// email, password и name
module.exports.createUsers = (req, res) => {

  const { email, password, name } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Auth.create({
        email,
        password: hash,
        name
      })
        .then((user) => {
          res.send(user);
        })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('введены некоректные данные'));
      } else {
        next(err);
      }
    });

}


// проверяет переданные в теле почту и пароль
// и возвращает JWT
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return Auth.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' } // токен будет просрочен через 7 дней после создания
      );
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};