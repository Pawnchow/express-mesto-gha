const { celebrate, Joi } = require('celebrate');
const { avatarUrlRegEx } = require('../utils/utils');

const signInValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarUrlRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(avatarUrlRegEx),
  }),
});

const cardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(avatarUrlRegEx),
  }),
});

module.exports = {
  signInValid,
  signUpValid,
  userIdValid,
  updateUserValid,
  updateAvatarValid,
  cardIdValid,
  createCardValid,
};
