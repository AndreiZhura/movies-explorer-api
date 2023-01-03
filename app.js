
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouters = require('./routers/users');
const movieRouters = require('./routers/movies');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/diplomdb');
mongoose.set('strictQuery', true);

app.use((req, res, next) => {
  req.user = {
    _id: '63aea22378a036beff3dcab3' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouters);
app.use('/', movieRouters);


app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});