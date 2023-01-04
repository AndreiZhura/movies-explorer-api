
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200)
        .send({ data: users })

    })
    .catch((err) => {
      res.status(500)
        .send({ message: err })
    })
}

module.exports.getUsersId = ( req, res ) => {
   User.findById(req.params._id)
   .then((users) => {
    res.status(200)
      .send({ data: users })

  })
  .catch((err) => {
    res.status(500)
      .send({ message: err })
  })
}

module.exports.deleteUsers = ( req, res ) => {
  User.findByIdAndRemove(req.params._id)
  .then((user) => {
    res.send({ message: "Пользователь удален"})
  })
  .catch((err) => {
    res.status(500).send({ message: err })
  })

}

module.exports.updateUsers = (req, res ) => {
  const { email,  name } = req.body;
  User.findByIdAndUpdate(req.params._id, { email,  name }, { new: true, runValidators: true },)
  .then((user) => {
    res.send({ data: user })
  })
  .catch((err) => {
    res.status(500).send({ message: err })
  })
}

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        res.send('данного пользователя не существует')
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}