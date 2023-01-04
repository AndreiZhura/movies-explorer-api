const bcrypt = require('bcryptjs'); // импортируем bcrypt
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
          res.send({
            _id: user._id,
            email: user.email,
            name: user.name,
          })
        })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })

}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Auth.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(404).send({ message: "rfrf" })
    });
};
