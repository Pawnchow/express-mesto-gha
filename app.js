const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63637f9d6f38509b9e9369f3',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((err, req, res, next) => {
  const e = err;
  if (!e.statusCode) {
    e.statusCode = 500;
    e.message = 'На сервере произошла ошибка';
  }
  res.status(e.statusCode).send({ message: e.message });
  next();
});
app.listen(PORT);
