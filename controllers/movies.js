const Movie = require("../models/movie");


module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createMovies = (req, res, next) => {
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

  const owner = req.user._id;

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
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(err))
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id).then((movie) => {
    movie.remove().then(() => res.status(200).send(movie));
  });
};
