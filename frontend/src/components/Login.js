import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalValidationConfig } from "./globalValidationConfig";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";

function Login({ onLogin, userEmail, setUserEmail }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main");
    }
  }, [navigate]);

  const emailTouched = false;
  const passwordTouched = false;

  const { email: emailConfig, password: passwordConfig } =
    globalValidationConfig;
  const validationConfig = {
    email: emailConfig,
    password: passwordConfig,
  };

  const {
    formData,
    validity,
    validationMessage,
    inputActive,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    isFormValid,
  } = FormValidator(validationConfig, { email: "", password: "" });

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onLogin(formData.email, formData.password);

    if (setUserEmail) {
      setUserEmail(formData.email || userEmail);
    }
  }

  function renderError(fieldName) {
    if (
      !validity[fieldName] &&
      (inputActive[fieldName] ||
        ((fieldName === "email" ? emailTouched : passwordTouched) &&
          !formData[fieldName]))
    ) {
      return (
        <span
          className={`auth-container__input-error auth-container-input-type-${fieldName}-error ${
            !validity[fieldName] ? "auth-container__error_visible" : ""
          }`}
        >
          {!formData[fieldName]
            ? validationConfig[fieldName].errorMessage
            : validationMessage[fieldName]}
        </span>
      );
    }
    return null;
  }
  return (
    <>
      <div className="auth-container">
        <h2 className="auth-container__title">Entrar</h2>
        <form
          action="#"
          className="auth-container__form"
          title="Entrar"
          onSubmit={handleSubmit}
        >
          <label className="auth-container__field">
            <TextInput
              context="auth"
              type="email"
              fieldName="email"
              validity={validity}
              inputActive={inputActive}
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("email")}
              onBlur={() => handleInputBlur("email")}
              placeholder="Email"
            />
            {renderError("email")}
          </label>
          <label className="auth-container__field">
            <TextInput
              context="auth"
              type="password"
              fieldName="password"
              validity={validity}
              inputActive={inputActive}
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("password")}
              onBlur={() => handleInputBlur("password")}
              placeholder="Password"
            />
            {renderError("password")}
          </label>
          <SubmitButton
            context="auth"
            type="submit"
            className="button-auth"
            isFormValid={isFormValid()}
          >
            Entrar
          </SubmitButton>
          <Link className="auth-container__link" to="/signup">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
