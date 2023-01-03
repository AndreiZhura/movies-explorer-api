
const user = require('../models/user');

module.exports.getUserMe = (req, res, next) => {

  user.findById(req.user)
    .then((user) => {
      if (!user) {
        res.send('данного пользователя не существует')
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
