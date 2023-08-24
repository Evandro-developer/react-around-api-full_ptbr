import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import { emailRegex, avatarRegex } from '../models/user'; // Importe as regexes diretamente

// Validador personalizado para URLs
export const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Validador para o cabeçalho de autorização
export const validateAuthorizationHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

// Validador para o ID do usuário nos parâmetros da rota
export const validateUserId = celebrate({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
});

// Validador para atualizar o perfil do usuário
export const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// Validador para atualizar o avatar do usuário
export const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(avatarRegex)
      .custom(validateURL, 'URL de avatar inválida'),
  }),
});

// Validador para registro de usuário
export const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().pattern(avatarRegex).custom(validateURL).optional(),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().min(6).required(),
  }),
});

// Validador para login de usuário
export const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validador para criar um cartão
export const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL, 'URL de imagem inválida'),
  }),
});

// Validador para o ID do cartão nos parâmetros da rota
export const validateCardId = celebrate({
  params: Joi.object({
    cardId: Joi.string().required(),
  }),
});
