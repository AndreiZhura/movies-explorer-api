const express = require('express');
const mongoose = require('mongoose');
// Mongoose - это инструмент моделирования объектов MongoDB,
// предназначенный для работы в асинхронной среде. Мангуст поддерживает Node.js и Дено (альфа).
const bodyParser = require('body-parser');
// Сборка пакетов: body-parser
const { errors } = require('celebrate');
const helmet = require('helmet');
const authRouters = require('./routers/auth');
const userRouter = require('./routers/users');
const movieRouters = require('./routers/movies');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE_ADRESS } = require('./constants/constants');

//  api.andreizhura-diplom.nomoredomains.club

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_ADRESS);

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
/* Аргументом методу bodyParser.urlencoded мы передаём объект опций.
 "extended: true" означает, что данные в полученном объекте body могут быть любых типов. */

app.use(requestLogger);

app.use('/', authRouters);
app.use(auth);
app.use('/', userRouter);
app.use('/', movieRouters);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);
