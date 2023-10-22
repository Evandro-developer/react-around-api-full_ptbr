export const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,100}$/;
export const urlRegex = /^https?:\/\/.+$/;
export const textRegex = /^.{2,100}$/;

export const validationConfig = {
  email: {
    required: true,
    errorMessage: "Email é requerido, ex.: 'nome@dominio.com'",
    pattern: {
      value: emailRegex,
      message: "Informe um e-mail no formato 'nome@dominio.com'",
    },
  },
  password: {
    required: true,
    errorMessage: "Senha é requerida, ex.: 'Ex@mpl3'",
    minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" },
    maxLength: {
      value: 100,
      message: "Senha deve ter no máximo 100 caracteres",
    },
    pattern: {
      value: passwordRegex,
      message:
        "'Ex@mpl3', mínimo 6 caracteres, inclua maiúsculas, minúsculas, números e símbolos.",
    },
  },
  avatar: {
    required: true,
    errorMessage:
      "Link do Avatar é requerido, ex.: 'http://exemplo.com/imagem.jpg'",
    pattern: {
      value: urlRegex,
      message: "O link deve começar com 'http://' ou 'https://'",
    },
  },
  name: {
    required: true,
    errorMessage: "Nome é requerido, ex.: 'João Silva'",
    pattern: {
      value: textRegex,
      message: "O nome deve ter entre 2 e 100 caracteres",
    },
  },
  about: {
    required: true,
    errorMessage: "Descrição é requerida, ex.: 'Pesquisador'",
    pattern: {
      value: textRegex,
      message: "Descrição deve ter pelo menos 2 caracteres",
    },
  },
  placeName: {
    required: true,
    errorMessage: "O nome do novo local é requerido, ex.: 'Parque Central'",
    pattern: {
      value: textRegex,
      message: "O nome do novo local deve ter entre 2 e 100 caracteres",
    },
  },
  link: {
    required: true,
    errorMessage:
      "Link da imagem é requerido, ex.: 'http://exemplo.com/imagem.jpg'",
    pattern: {
      value: urlRegex,
      message: "O link deve começar com 'http://' ou 'https://'",
    },
  },
};

export const requiredFieldsConfig = {
  register: ["email", "password"],
  login: ["email", "password"],
  avatar: ["avatar"],
  profile: ["name", "about"],
  place: ["placeName", "link"],
};

export function validateInput(name, value) {
  const validationRules = validationConfig[name];
  if (!validationRules) return "";

  if (validationRules.required && !value) {
    return validationRules.errorMessage;
  }
  if (
    validationRules.pattern &&
    validationRules.pattern.value &&
    !validationRules.pattern.value.test(value)
  ) {
    return validationRules.pattern.message;
  }
  if (
    validationRules.minLength &&
    value.length < validationRules.minLength.value
  ) {
    return validationRules.minLength.message;
  }
  if (
    validationRules.maxLength &&
    value.length > validationRules.maxLength.value
  ) {
    return validationRules.maxLength.message;
  }

  return "";
}

const generateErrorClass = (base, errors, inputActive) => (errorType) => {
  return `${base}__input-error ${
    errors[errorType]
      ? `${base}__input_type_error ${base}__error_visible`
      : `${base}__error`
  } ${inputActive[errorType] ? `${base}__input_active` : ""}`;
};

export function errorClasses(errors, isValid, inputActive, formType) {
  const baseClassName =
    formType === "login" || formType === "register"
      ? "auth-container"
      : "popup";

  const generateErrorClassForType = generateErrorClass(
    baseClassName,
    errors,
    inputActive
  );

  const [
    emailClassesError,
    passwordClassesError,
    avatarClassesError,
    nameClassesError,
    aboutClassesError,
    placeClassesError,
    linkClassesError,
  ] = ["email", "password", "avatar", "name", "about", "placeName", "link"].map(
    generateErrorClassForType
  );

  const btnPopupSubmitClassError = `popup__button ${
    !isValid ? "popup__button_disabled" : ""
  }`;

  const buttonAuthClassError = `button-auth ${
    !isValid ? "button-auth_disabled" : ""
  }`;

  return {
    emailClassesError,
    passwordClassesError,
    avatarClassesError,
    nameClassesError,
    aboutClassesError,
    placeClassesError,
    linkClassesError,
    btnPopupSubmitClassError,
    buttonAuthClassError,
  };
}
