const userRouters = require('express').Router();

const { updateUserMe, getUsersMe } = require('../controllers/users');

userRouters.get('/users/me',getUsersMe)
userRouters.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}),
updateUserMe)


module.exports = userRouters;