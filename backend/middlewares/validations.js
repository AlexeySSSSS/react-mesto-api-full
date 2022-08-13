const { celebrate, Joi } = require('celebrate');
const validator = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const checkingUrl = (url) => {
  const validate = validator(url);
  if (validate) {
    return url;
  }
  throw new BadRequestError('Неправильный формат URL адреса');
};

const checkingLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkingCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkingUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkingUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const checkingUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(checkingUrl),
  }),
});

const checkingUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const checkingCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(checkingUrl),
  }),
});

const checkingCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  checkingLogin,
  checkingCreateUser,
  checkingUpdateUser,
  checkingUpdateAvatar,
  checkingUserId,
  checkingCreateCard,
  checkingCardId,
};
