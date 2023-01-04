const Auth = require('../models/user');

module.exports.createUsers = (req, res) => {

  const { email, password, name } = req.body;

  Auth.create({ email, password, name })
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })

}
