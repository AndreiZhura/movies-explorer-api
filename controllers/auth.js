const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const Auth = require('../models/user');


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
      res.status(500).send({ message: err })
    })

}


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