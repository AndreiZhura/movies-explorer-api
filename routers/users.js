const userRouters = require('express').Router();

const { getUserMe, createUsers } = require('../controllers/users');

userRouters.get('/users/me', getUserMe);
userRouters.post('/users', createUsers);

module.exports = userRouters;