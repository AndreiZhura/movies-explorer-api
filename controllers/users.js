const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ErrorCode = require('../errors/ErrorCode');


module.exports.updateUserMe = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Данного пользователя не существует');
      }
      return res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsersMe = (req, res, next) => {
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