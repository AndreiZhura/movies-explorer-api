const mongoose = require('mongoose');
const validator = require('validator');

const movieScheme = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    minlength: 2,
  },
  year: {
    type: Number,
    minlength: 2,
    maxlength: 4,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 10000,
  },
  image: {
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
  },
  trailerLink: {
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
  },
  thumbnail: {
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 10,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieScheme);