const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const ErrorCode = require('../errors/ErrorCode');
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail,
// movieId
module.exports.createMovies = (req, res, next) => {
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
        .send({ data: movie });
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
    });
};

// возвращает все сохранённые текущим  пользователем фильмы

module.exports.getMovie = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      next(err);
    });
};
// удаляет сохранённый фильм по id

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Данного фильма не существует');
      } else if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden('попытка удалить фильм другово пользователя');
      } else {
        return movie.remove().then(() => res.status(200).send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new Forbidden('Ошибка обработки данных');
      } else {
        next(err);
      }
    });
};
