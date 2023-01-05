const Movie = require('../models/movie');


//создаёт фильм с переданными в теле
//country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
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
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Ошибка обработки данных'));
      } else {
        next(err);
      }
    });
}

//возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovie = (req, res) => {
  Movie.find({})
    .then((movie) => {

      res.status(200).send({ data: movie })
    })
    .catch((err) => {
      next(err);
    });
}
// удаляет сохранённый фильм по id

module.exports.deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params._id)
  .then((cards) => {
    if (!cards) {
      throw new NotFoundError('Данной карточки не существует');
    } else if (!cards.owner.equals(req.user._id)) {
      throw new Forbidden('попытка удалить карточку другово пользователя');
    } else {
      return cards.remove().then(() => res.status(200).send(cards));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new Forbidden('Ошибка обработки данных');
    } else {
      next(err);
    }
  });
}