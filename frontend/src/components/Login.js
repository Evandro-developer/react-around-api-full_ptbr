import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function Login({ onLogin, userEmail, setUserEmail, formType, setFormType }) {
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
        <h2 className="auth-container__title">Entrar</h2>
        <form
          action="#"
          className="auth-container__form"
          title="Entrar"
          onSubmit={handleSubmit}
        >
          <label className="auth-container__field">
            <Input
              name="email"
              type="email"
              placeholder="Por favor, digite seu e-mail para entrar"
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
              placeholder="Por favor, digite sua senha para entrar"
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
            Entrar
          </ButtonSubmit>
          <Link className="auth-container__link" to="/signup">
            Ainda não é membro? Inscreva-se aqui!
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
