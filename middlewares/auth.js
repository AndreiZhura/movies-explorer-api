const { SECRET_KEY_JWT } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const { AUTHORIZATION_REQUIRED } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(`auth ${authorization}`);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(`auth ${authorization}`);
    throw new AuthorizationRequired(AUTHORIZATION_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY_JWT);
    console.log(`JWT ${SECRET_KEY_JWT}`);
    console.log(`TOKEN ${token}`);
  } catch (err) {
    next(new AuthorizationRequired(AUTHORIZATION_REQUIRED));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
