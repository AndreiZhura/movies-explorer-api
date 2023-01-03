const userRouters = require('express').Router();

const { getUserMe, updateUserMe, getUsers , createUsers } = require('../controllers/users');

userRouters.post('/users', createUsers);
userRouters.get('/users/me', getUserMe);
userRouters.get('/users', getUsers);
userRouters.patch('/users/me',updateUserMe)

module.exports = userRouters;