
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routers/users')


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/diplomdb');
mongoose.set('strictQuery', true);

app.use((req, res, next) => {
  req.user = {
    _id: '63b46a41be3ff95a91a7c8d8' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouter);



app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});