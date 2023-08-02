const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { errorsMV } = require('./middlewares/errors');
const { requestLooger, errorLogger } = require('./middlewares/logger');
const {
  login, createUser,
} = require('./controllers/users');
const router = require('./routes/index');
const {
  createUserValidation, loginValidation,
} = require('./middlewares/validation');
const { auth } = require('./middlewares/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.use(bodyParser.json());

app.use(requestLooger); //логгер запросов
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(router);

app.use(errorLogger); //логгер ошибок
app.use(errors());  //обработчик ошибок celebrate
app.use(errorsMV);  //централизованный обработчик ошибок

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
