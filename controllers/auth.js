const bcrypt = require('bcryptjs'); // импортируем bcrypt
const Auth = require('../models/user');

/*
module.exports.createUsers = (req, res) => {

  const { email, password, name } = req.body;

  Auth.create({ email, password, name })
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })

}*/

module.exports.createUsers = (req, res) => {

  const { email, password, name } = req.body;

  Auth.findOne({ email })

    .then((user) => {
      if (user) {
        res.status(500).send({ message: "Такой пользователь уже сущетсвует" })
      }
      else {
        return bcrypt.hash(password);
      }
    })

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Auth.create({
        email,
        password: hash,
        name
      })
    })
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })

}
