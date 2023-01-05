const userRouters = require('express').Router();

const { getUsers , deleteUsers, updateUsers, getUsersMe } = require('../controllers/users');

userRouters.get('/users', getUsers);
userRouters.get('/users/me', getUsersMe)
userRouters.patch('/users/:_id', updateUsers)
userRouters.delete('/users/:_id', deleteUsers);

module.exports = userRouters;