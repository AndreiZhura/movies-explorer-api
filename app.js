require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiRequestLimiter);

app.use('/', routes);

app.use(errors());

app.use(requestLogger);

app.use(errorLogger);

app.use(errors());

app.use('*', NOT_FOUND_ERROR);

app.use(SERVER_ERROR);

app.listen(PORT);
