const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = require('../constants/constants');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationRequired('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY_JWT);
  } catch (err) {
    next(new AuthorizationRequired('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
