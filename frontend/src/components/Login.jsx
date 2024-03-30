import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function Login({ onLogin, userEmail, setUserEmail, formType, setFormType }) {
  const { t } = useContext(LangContext);
  const navigate = useNavigate();

  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation(formType);

  const { emailClassesError, passwordClassesError, buttonAuthClassError } =
    errorClasses(errors, isValid, inputActive, formType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);

    if (setUserEmail) {
      setUserEmail(values.email || userEmail);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main");
    }
  }, [navigate]);

  useEffect(() => {
    resetForm();
    setFormType("login");
  }, [resetForm]);

  return (
    <>
      <div className="auth-container">
        <h2 className="auth-container__title">{t("login.title")}</h2>
        <form
          action="#"
          className="auth-container__form"
          title={t("login.submitAuth")}
          onSubmit={handleSubmit}
        >
          <label className="auth-container__field">
            <Input
              name="email"
              type="email"
              placeholder={t("login.emailPlaceholder")}
              value={values.email || ""}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              errors={errors.email}
              errorClassName={emailClassesError}
              className={`auth-container__input`}
            />
          </label>
          <label className="auth-container__field">
            <Input
              name="password"
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={values.password || ""}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              errors={errors.password}
              errorClassName={passwordClassesError}
              className={`auth-container__input`}
            />
          </label>
          <ButtonSubmit
            className={buttonAuthClassError}
            isValid={isValid}
            onClick={(e) => handleSubmit(e)}
          >
            {t("login.btnAuth")}
          </ButtonSubmit>
          <Link className="auth-container__link" to="/signup">
            {t("login.notAMember")}
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
