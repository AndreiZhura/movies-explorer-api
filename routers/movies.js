
const movieRouters = require('express').Router();

const { createMovies, getMovie } = require('../controllers/movies');

movieRouters.get('/movies', getMovie);
movieRouters.post('/movies', createMovies);

module.exports = movieRouters;