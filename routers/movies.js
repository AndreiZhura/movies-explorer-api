const movieRouters = require('express').Router();

const { postMovies, deleteMovies } = require('../validation/validationJoi');

const {
  createMovies,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouters.get('/movies', getMovie);
movieRouters.post('/movies', postMovies, createMovies);
movieRouters.delete('/movies/:_id', deleteMovies, deleteMovie);

module.exports = movieRouters;
