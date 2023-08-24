import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({
  onRegister,
  email,
  setEmail,
  password,
  setPassword,
  loggedIn,
  userEmail,
  setUserEmail,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/signin");
      if (setUserEmail) {
        setUserEmail(email || userEmail);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <>
      <div className="auth-container">
        <h2 className="auth-container__title">Inscrever-se</h2>
        <form
          action="#"
          className="auth-container__form"
          title="Inscrever-se"
          onSubmit={(e) => {
            e.preventDefault();
            onRegister(email, password);
          }}
        >
          <input
            className="auth-container__input"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-container__input"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button-auth">
            Inscrever-se
          </button>
          <Link className="auth-container__link" to="/signin">
            Já é um membro? Faça o login aqui!
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
