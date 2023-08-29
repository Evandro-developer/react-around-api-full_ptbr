export const globalValidationConfig = {
  avatar: {
    required: true,
    errorMessage: "Avatar é requerido",
    pattern: /^https?:\/\/.+$/,
    patternErrorMessage: "Link deve começar com 'http://' ou 'https://'",
  },
  name: {
    required: true,
    errorMessage: "Nome é requerido",
    minLength: 2,
    minLengthErrorMessage: "Nome deve ter pelo menos 2 caracteres",
    maxLength: 40,
    maxLengthErrorMessage: "Nome deve ter no máximo 40 caracteres",
  },
  about: {
    required: true,
    errorMessage: "Descrição é requerida",
    minLength: 2,
    minLengthErrorMessage: "Descrição deve ter pelo menos 2 caracteres",
    maxLength: 200,
    maxLengthErrorMessage: "Descrição deve ter no máximo 200 caracteres",
  },
  link: {
    required: true,
    errorMessage: "Link é requerido",
    pattern: /^https?:\/\/.+$/,
    patternErrorMessage: "Link deve começar com 'http://' ou 'https://'",
  },
  email: {
    required: true,
    errorMessage: "Email é requerido",
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    patternErrorMessage: "Informe um e-mail no formato 'nome@dominio.com'.",
  },
  password: {
    required: true,
    errorMessage: "Senha é requerida",
    minLength: 6,
    minLengthErrorMessage: "Senha deve ter pelo menos 6 caracteres",
    maxLength: 100,
    maxLengthErrorMessage: "Senha deve ter no máximo 100 caracteres",
  },
};
