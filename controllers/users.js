const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ErrorCode = require('../errors/ErrorCode');
const Conflict = require('../errors/Conflict');
const { THIS_USER_DOES_NOT_EXIST, DATA_PROCESSING_ERROR, THIS_USER_ALREADY_EXISTS } = require('../constants/constants');

module.exports.updateUserMe = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(DATA_PROCESSING_ERROR));
      } else if (err.codeName === 'DuplicateKey') {
        next(new Conflict(THIS_USER_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(THIS_USER_DOES_NOT_EXIST);
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode(DATA_PROCESSING_ERROR));
      } else {
        next(err);
      }
    });
};
