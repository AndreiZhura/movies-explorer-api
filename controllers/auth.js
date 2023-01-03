const bcrypt = require('bcryptjs');
const user = require('../models/user');


module.exports.createUsers = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
  .then(hash => user.create({
    email:req.body.email,
    password: hash,
    name: req.body.name,
  }))

    .then(user => res.send({ data: user }))
    .catch((err) => res.status(400).send(err));
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};