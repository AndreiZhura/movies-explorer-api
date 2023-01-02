const bcrypt = require('bcryptjs');
const users = require('../models/user');

module.exports.getUserMe = (req, res, next) => {

  users.findById(req.user)
    .then((user) => {
      if (!user) {
        res.send('данного пользователя не существует')
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUsers = (req, res, next) => {

  const { email, name } = req.body;

  bcrypt.hash(req.body.password, 10)
  .then(hash => users.create({
    email:email,
    password: hash,
    name: name,
  }))

    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}