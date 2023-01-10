require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Mongoose - это инструмент моделирования объектов MongoDB,
// предназначенный для работы в асинхронной среде. Мангуст поддерживает Node.js и Дено (альфа).
const bodyParser = require('body-parser');
// Сборка пакетов: body-parser
const { errors } = require('celebrate');
const helmet = require('helmet');
// const DATABASE_ADRESS = require('./constants/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routers/index');
const { apiRequestLimiter } = require('./riteLimited/riteLimited');

//  api.andreizhura-diplom.nomoredomains.club
const {
  SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require('./middlewares/errors');

const { PORT, DATABASE_ADRESS } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_ADRESS);

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
/* Аргументом методу bodyParser.urlencoded мы передаём объект опций.
 "extended: true" означает, что данные в полученном объекте body могут быть любых типов. */
app.use(apiRequestLimiter);
app.use('/', routes);

app.use(errors()); // обработчик ошибок celebrate

app.use('*', NOT_FOUND_ERROR);

app.use(requestLogger);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(SERVER_ERROR);

app.listen(PORT, () => {
  console.log(process.env);
});
