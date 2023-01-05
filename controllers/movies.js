const Movie = require('../models/movie');

module.exports.createMovies = (req, res) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(200)
        .send({ data: movie })
    })

    .catch((err) => {
      res.status(500)
        .send({ message: err })
    })
}

module.exports.getMovie = (req, res) => {
  Movie.find({})
    .then((movie) => {

      res.status(200).send({ data: movie })
    })
    .catch((err) => {
      res.status(500).send({ message: err })
    })
}

module.exports.deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params._id)
    .then((movie) => {
      res.status(200)
        .send({ data: movie });
    })

    .catch((err) => {
      res.status(500)
        .send({ message: err });
    })
}