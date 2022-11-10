const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const {
  signInValid,
  signUpValid,
} = require('./middlewares/validation');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app.use(helmet());
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signin', signInValid, login);
app.post('/signup', signUpValid, createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errors());
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
