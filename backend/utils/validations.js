const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlRegex = /^(https?:\/\/)?(www\.)?[\w\d.-]+(:\d+)?(\/[\w\d._~:/?%#[\]@!$&'()*+,;=-]*)?(#\w*)?$/i;

const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;

exports.urlRegex = urlRegex;
exports.emailRegex = emailRegex;

// Validador personalizado para URLs.
// Custom validator for URLs.
exports.validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Validador para o cabeçalho de autorização.
// Validator for the authorization header.
exports.validateAuthorizationHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

// Validador para o ID do usuário nos parâmetros da rota.
// Validator for the user ID in the route parameters,
exports.validateUserId = celebrate({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
});

// Validador para atualizar o perfil do usuário.
// Validator for updating the user's profile.
exports.validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(60),
    about: Joi.string().min(2).max(200),
  }),
});

// Validador para atualizar o avatar do usuário.
// Validator for updating the user's avatar.
exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(urlRegex)
      .custom(exports.validateURL, 'Invalid avatar URL'),
  }),
});

// Validador para registro de usuário.
// Validator for user registration.
exports.validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string()
      .pattern(urlRegex)
      .custom(exports.validateURL)
      .optional(),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().min(6).required(),
  }),
});

// Validador para login de usuário.
// Validator for user login.
exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validador para criar um cartão.
// Validator for creating a card.
exports.validateCardCreation = celebrate({
  body: Joi.object().keys({
    placeName: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .required()
      .custom(exports.validateURL, 'Invalid image URL'),
  }),
});

// Validador para o ID do cartão nos parâmetros da rota.
// Validator for the card ID in the route parameters.
exports.validateCardId = celebrate({
  params: Joi.object({
    cardId: Joi.string().required(),
  }),
});
