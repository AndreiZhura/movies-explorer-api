
const movieRouters = require('express').Router();

const { createMovies } = require('../controllers/movies');

movieRouters.post('/movies', createMovies);

module.exports = movieRouters;