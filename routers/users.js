const userRouters = require('express').Router();

const { getUserMe} = require('../controllers/users');
const { createUsers } = require('../controllers/auth');

userRouters.get('/users/me', getUserMe);
userRouters.post('/users', createUsers);

module.exports = userRouters;