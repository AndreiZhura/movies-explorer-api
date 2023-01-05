const userRouters = require('express').Router();

const { updateUsers, getUsersMe } = require('../controllers/users');

userRouters.get('/users/me', getUsersMe)
userRouters.patch('/users/:_id', updateUsers)


module.exports = userRouters;