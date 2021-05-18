const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

exports.joiUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

exports.joiCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

exports.joiProfileUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

exports.joiAvatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, dissalow_auth: true })) {
        return value;
      } return helpers.message('Ссылка не подходит');
    }),
  }),
});

exports.joiCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, dissalow_auth: true })) {
        return value;
      } return helpers.message('Ссылка не подходит');
    }),
  }),
});

exports.joiAuth = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
        return value;
      }
      return helpers.message('Ссылка не подходит');
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

exports.joiLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
