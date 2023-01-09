const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const ErrorCode = require('../errors/ErrorCode');
const {
  DATA_PROCESSING_ERROR,
  THIS_MOVIE_DOES_NOT_EXIST,
  TRYING_TO_DELETE_ANOTHER_USERS_MOVIE,
  INVALID_MOVIE_ID,
} = require('../constants/constants');
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail,
// movieId
module.exports.createMovies = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(200).send({ data: movie });
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(DATA_PROCESSING_ERROR));
      } else {
        next(err);
      }
    });
};

// возвращает все фильмы

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => {
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      next(err);
    });
};
// удаляет сохранённый фильм по id

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(THIS_MOVIE_DOES_NOT_EXIST);
      } else if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden(TRYING_TO_DELETE_ANOTHER_USERS_MOVIE);
      }
      return movie.remove().then(() => res.status(200).send(movie));
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        throw new ErrorCode(INVALID_MOVIE_ID);
      } else {
        next(err);
      }
    });
};
