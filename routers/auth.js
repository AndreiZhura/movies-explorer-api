const authRouters = require('express').Router();

const { createUser, login } = require('../controllers/auth');

authRouters.post('/signup', createUser);
authRouters.post('/signin',login);

module.exports = authRouters;