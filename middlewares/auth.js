const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = require('../constants/constants');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const { AUTHORIZATION_REQUIRED } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationRequired(AUTHORIZATION_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY_JWT);
  } catch (err) {
    next(new AuthorizationRequired(AUTHORIZATION_REQUIRED));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
