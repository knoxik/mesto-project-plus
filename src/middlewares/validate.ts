const { celebrate, Joi } = require('celebrate');

const URL_REGEX = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(URL_REGEX),
  }),
});

export const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEX),
  }),
});

export const validateUserIdParam = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required().length(24),
  }),
});

export const validateCardIdParam = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
});

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
});
