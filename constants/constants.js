const { PORT = 3000 } = process.env;
const { DATABASE_ADRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const THIS_USER_ALREADY_EXISTS = 'Такой пользователь уже существует!';
const INCORRECT_DATA_ENTERED = 'Введены некоректные данные';
const DATA_PROCESSING_ERROR = 'Ошибка обработки данных';
const THIS_MOVIE_DOES_NOT_EXIST = 'Данного фильма не существует';
const TRYING_TO_DELETE_ANOTHER_USERS_MOVIE = 'Попытка удалить фильм другово пользователя';
const INVALID_MOVIE_ID = 'Некорректный _id фильма';
const THIS_USER_DOES_NOT_EXIST = 'Данного пользователя не существует';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const THE_REQUESTED_RESOURCE_IS_NOT_FOUND = 'Запрашиваемый ресурс не найден';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

// errors
module.exports = {
  THIS_USER_ALREADY_EXISTS,
  INCORRECT_DATA_ENTERED,
  DATA_PROCESSING_ERROR,
  THIS_MOVIE_DOES_NOT_EXIST,
  TRYING_TO_DELETE_ANOTHER_USERS_MOVIE,
  INVALID_MOVIE_ID,
  THIS_USER_DOES_NOT_EXIST,
  AUTHORIZATION_REQUIRED,
  WRONG_EMAIL_OR_PASSWORD,
  THE_REQUESTED_RESOURCE_IS_NOT_FOUND,
  SERVER_ERROR_MESSAGE,
  PORT,
  DATABASE_ADRESS,
};

module.exports.SALT_ROUND = 10;

module.exports.REGEX = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
