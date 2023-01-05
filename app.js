
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouters = require('./routers/auth');
const userRouter = require('./routers/users');
const movieRouters = require('./routers/movies');
const auth  = require('./middlewares/auth');


const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/diplomdb');
mongoose.set('strictQuery', true);


app.use('/',authRouters);
//app.use(auth);
app.use('/', userRouter);
app.use('/', movieRouters);



app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});