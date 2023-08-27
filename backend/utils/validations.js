const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { emailRegex, avatarRegex } = require('../models/user');

// Validador personalizado para URLs
exports.validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Validador para o cabeçalho de autorização
exports.validateAuthorizationHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

// Validador para o ID do usuário nos parâmetros da rota
exports.validateUserId = celebrate({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
});

// Validador para atualizar o perfil do usuário
exports.validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// Validador para atualizar o avatar do usuário
exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(avatarRegex)
      .custom(exports.validateURL, 'URL de avatar inválida'),
  }),
});

// Validador para registro de usuário
exports.validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string()
      .pattern(avatarRegex)
      .custom(exports.validateURL)
      .optional(),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().min(6).required(),
  }),
});

// Validador para login de usuário
exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validador para criar um cartão
exports.validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .required()
      .custom(exports.validateURL, 'URL de imagem inválida'),
  }),
});

// Validador para o ID do cartão nos parâmetros da rota
exports.validateCardId = celebrate({
  params: Joi.object({
    cardId: Joi.string().required(),
  }),
});
