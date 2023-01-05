const User = require('../models/user');


module.exports.updateUsers = (req, res) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.params._id, { email, name }, { new: true, runValidators: true },)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.getUsersMe = (req, res) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        res.send('данного пользователя не существует');
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};