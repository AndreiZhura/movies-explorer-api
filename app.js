
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouters = require('./routers/auth');
const userRouter = require('./routers/users');
const movieRouters = require('./routers/movies');
const auth  = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/diplomdb');
mongoose.set('strictQuery', true);


app.use('/',authRouters);
app.use(auth);
app.use('/', userRouter);
app.use('/', movieRouters);

app.use('*', (req, res, next) => { next(new NotFoundError('Запрашиваемый ресурс не найден')); });

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);