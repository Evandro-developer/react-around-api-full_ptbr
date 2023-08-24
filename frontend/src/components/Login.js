import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin, email, setEmail, password, setPassword }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-container__title">Entrar</h2>
      <form
        action="#"
        className="auth-container__form"
        title="Entrar"
        onSubmit={handleSubmit}
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
          Entrar
        </button>
        <Link className="auth-container__link" to="/signup">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </form>
    </div>
  );
}

export default Login;
