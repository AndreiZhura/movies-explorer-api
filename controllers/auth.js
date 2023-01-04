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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  Auth.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна!
    /*  const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });*/
      res.send({ user : user });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
