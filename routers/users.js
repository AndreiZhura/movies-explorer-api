const userRouters = require('express').Router();
const { updateUserMe, getUsersMe } = require('../controllers/users');
const { patchUserMe } = require('../validation/validationJoi');

userRouters.get('/users/me', getUsersMe);
userRouters.patch('/users/me', patchUserMe, updateUserMe);

module.exports = userRouters;
