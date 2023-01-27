const NotFoundError = require('../errors/NotFoundError');
const { THE_REQUESTED_RESOURCE_IS_NOT_FOUND, SERVER_ERROR_MESSAGE } = require('../constants/constants');

const SERVER_ERROR = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? SERVER_ERROR_MESSAGE : message,
  });
  next();
};

const NOT_FOUND_ERROR = (req, res, next) => {
  next(new NotFoundError(THE_REQUESTED_RESOURCE_IS_NOT_FOUND));
};

module.exports = {
  SERVER_ERROR,
  NOT_FOUND_ERROR,
};
