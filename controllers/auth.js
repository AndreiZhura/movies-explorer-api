const bcrypt = require('bcryptjs'); // импортируем bcrypt
const Auth = require('../models/user');

module.exports.createUsers = (req, res) => {

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Auth.create({
        email: req.body.email,
        password: hash,
        name:req.body.name
      })
    })
    .then((user) => {
      res.send({
         email: user.email,
         name: user.name,
         _id: user._id,
       })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })

}
