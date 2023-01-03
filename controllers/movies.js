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
    _id
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
    .then((movie) => {
      res.status(200).send(movie)
    })
    .catch((err) => res.status(500).send(err))
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      console.log(movie)
    });
};
