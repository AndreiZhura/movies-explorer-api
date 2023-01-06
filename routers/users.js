const userRouters = require('express').Router();

const { updateUserMe, getUsersMe } = require('../controllers/users');

userRouters.get('/users/me',getUsersMe)
userRouters.patch('/users/me', updateUserMe)


module.exports = userRouters;