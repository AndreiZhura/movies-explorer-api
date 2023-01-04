const authRouters = require('express').Router();

const { createUsers, login } = require('../controllers/auth');

authRouters.post('/signup', createUsers);
authRouters.post('/signin',login);

module.exports = authRouters;