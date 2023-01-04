
const movieRouters = require('express').Router();

const { createMovies, getMovie, deleteMovie } = require('../controllers/movies');

movieRouters.get('/movies', getMovie);
movieRouters.post('/movies', createMovies);
movieRouters.delete('/movies/:_id', deleteMovie);

module.exports = movieRouters;