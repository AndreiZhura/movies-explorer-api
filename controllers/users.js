const users = require('../models/user');

module.exports.getUserMe = (req, res, next) => {

  users.findById(req.user)
    .then((user) => {
      console.log('Test Users')
    })
    .catch((err) => {
      console.log('error');
    })
}

module.exports.createUsers = (req, res, next) => {

  const { email, password, name} = req.body;

  users.create({ email, password, name})
  .then(user => res.send({data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}