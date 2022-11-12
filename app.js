const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser, logout } = require('./controllers/users');
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
app.use(cookieParser());

app.post('/signin', signInValid, login);
app.post('/signup', signUpValid, createUser);
app.get('/signout', logout);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
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
