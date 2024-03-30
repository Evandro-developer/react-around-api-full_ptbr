import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";

export const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,100}$/;
export const urlRegex = /^https?:\/\/.+$/;
export const textRegex = /^.{2,200}$/;

export const useValidationConfig = () => {
  const { t } = useContext(LangContext);

  return {
    email: {
      required: true,
      errorMessage: t("validation.emailRequired"),
      pattern: {
        value: emailRegex,
        message: t("validation.emailPattern"),
      },
    },
    password: {
      required: true,
      errorMessage: t("validation.passwordRequired"),
      minLength: { value: 6, message: t("validation.passwordMinLength") },
      maxLength: { value: 100, message: t("validation.passwordMaxLength") },
      pattern: {
        value: passwordRegex,
        message: t("validation.passwordPattern"),
      },
    },
    avatar: {
      required: true,
      errorMessage: t("validation.avatarRequired"),
      pattern: {
        value: urlRegex,
        message: t("validation.avatarPattern"),
      },
    },
    name: {
      required: true,
      errorMessage: t("validation.nameRequired"),
      pattern: {
        value: textRegex,
        message: t("validation.namePattern"),
      },
    },
    about: {
      required: true,
      errorMessage: t("validation.aboutRequired"),
      pattern: {
        value: textRegex,
        message: t("validation.aboutPattern"),
      },
    },
    placeName: {
      required: true,
      errorMessage: t("validation.placeNameRequired"),
      pattern: {
        value: textRegex,
        message: t("validation.placeNamePattern"),
      },
    },
    link: {
      required: true,
      errorMessage: t("validation.linkRequired"),
      pattern: {
        value: urlRegex,
        message: t("validation.linkPattern"),
      },
    },
  };
};

export const requiredFieldsConfig = {
  register: ["email", "password"],
  login: ["email", "password"],
  avatar: ["avatar"],
  profile: ["name", "about"],
  place: ["placeName", "link"],
};

export function validateInput(name, value, validationConfig) {
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
