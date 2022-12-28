const express = require('express');
const userRouters = require('./routers/users');
const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '636e4e352e8574d451380e0e',
  };

  next();
});

app.use('/', userRouters);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})