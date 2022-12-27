const mongoose = require('mongoose');

const movieScheme = new mongoose.Schema({
   country:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
   },
   director:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
   },
   duration:{
    type: Number,
    minlength: 2,
    maxlength: 30,
   },
   year: {
    type: Number,
    minlength: 4,
    maxlength: 4,
   },
   description: {
    type: String,
    minlength: 2,
    maxlength: 1000,
   },
   image:{
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
   },
   trailerLink: {
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
   },
   thumbnail:{
    type: String,
    validate: { validator: (v) => validator.isURL(v) },
   },
   owner: {
    type: String,
    required: true,
   },
   movieId:{
    type: String,
    required: true,
   },
   nameRU:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
   }
});