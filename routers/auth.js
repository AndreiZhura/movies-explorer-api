const authRouters = require('express').Router();

const { createUsers } = require('../controllers/auth');

authRouters.post('/signup', createUsers);

module.exports = authRouters;