const userRouters = require('express').Router();

const { getUsers , createUsers, getUsersId, deleteUsers, updateUsers, getUsersMe } = require('../controllers/users');

userRouters.get('/users', getUsers);
userRouters.get('/users/me', getUsersMe)
userRouters.get('/users/:_id', getUsersId);
userRouters.patch('/users/:_id', updateUsers)
userRouters.post('/users', createUsers);
userRouters.delete('/users/:_id', deleteUsers);

module.exports = userRouters;