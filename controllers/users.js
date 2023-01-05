const User = require('../models/user');


module.exports.updateUsers = (req, res) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.params._id, { email, name }, { new: true, runValidators: true },)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Данного пользователя не существует');
    }
    return res.status(200).send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ErrorCode('Ошибка обработки данных'));
    } else {
      next(err);
    }
  });
};

module.exports.getUsersMe = (req, res) => {
  User.findById(req.user)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Данного пользователя не существует');
    }
    return res.status(200).send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ErrorCode('Ошибка обработки данных'));
    } else {
      next(err);
    }
  });
};