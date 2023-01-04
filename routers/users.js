const userRouters = require('express').Router();

const { getUsers ,  getUsersId, deleteUsers, updateUsers, getUsersMe } = require('../controllers/users');

userRouters.get('/users', getUsers);
userRouters.get('/users/me', getUsersMe)
userRouters.get('/users/:_id', getUsersId);
userRouters.patch('/users/:_id', updateUsers)
userRouters.delete('/users/:_id', deleteUsers);

module.exports = userRouters;