const authRouters = require('express').Router();

const { createUsers } = require('../controllers/users');

authRouters.post('/signup', createUsers);

module.exports = authRouters;