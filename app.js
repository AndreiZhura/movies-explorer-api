const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/diplomdb');
mongoose.set('strictQuery', true);

app.use('/users', require('./routers/users'));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});