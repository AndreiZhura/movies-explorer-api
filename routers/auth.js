const authRouters = require('express').Router();
const { signup, signin } = require('../validation/validationJoi');

const { createUser, login } = require('../controllers/auth');

authRouters.post('/signup', signup, createUser);
authRouters.post('/signin', signin, login);

module.exports = authRouters;
