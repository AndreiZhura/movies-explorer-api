/* eslint-disable function-paren-newline */
const movieRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const REGEX = require('../constants/constants');
const {
  createMovies,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouters.get('/movies', getMovie);
movieRouters.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required().min(2),
      description: Joi.string().required().min(2),
      image: Joi.string().required(REGEX),
      trailerLink: Joi.string().required(REGEX),
      thumbnail: Joi.string().required(REGEX),
      movieId: Joi.string().required().min(2).max(10),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovies);

movieRouters.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie);

module.exports = movieRouters;
