const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/isAuthorized');
const { regExpURL } = require('./constants/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/Error404');
const { main } = require('./controllers/nodemailer');

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
const { PORT = 3001 } = process.env;
const options = {
  origin: [
    'http://localhost:3000',
    'https://lechkarpov.students.nomoredomains.xyz',
    'http://lechkarpov.students.nomoredomains.xyz',
  ],
  credentials: true,
};
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.post('/sender', main)

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .pattern(new RegExp(regExpURL)),
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
}), createUser);

app.use('/users', isAuthorized, usersRoutes);
app.use('/cards', isAuthorized, cardsRoutes);

app.use(isAuthorized, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
