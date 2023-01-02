const movieRouters = require('express').Router();

const { getMovies, createMovies, deleteMovie } = require('../controllers/movies');

movieRouters.get('/movies',getMovies);
movieRouters.post('/movies',createMovies);
movieRouters.delete('/movies/_id', deleteMovie);

module.exports = movieRouters;