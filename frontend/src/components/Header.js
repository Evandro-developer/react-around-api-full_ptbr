import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.png";
import logoSmall from "../images/logo_small.png";

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  const renderAuthLinks = () => {
    if (location.pathname === "/signup") {
      return (
        <Link className="header__auth-status" to="/signin">
          Entrar
        </Link>
      );
    } else if (location.pathname === "/signin") {
      return (
        <Link className="header__auth-status" to="/signup">
          Faça o login
        </Link>
      );
    } else if (loggedIn) {
      return (
        <Link className="header__auth-status" to="/signin" onClick={onSignOut}>
          Sair
        </Link>
      );
    }
  };

  return (
    <header className="header">
      <div className="header__user-panel">
        <picture>
          <source media="(max-width: 768px)" srcSet={logoSmall} />
          <img src={logo} alt="Logo Around The U.S." className="header__logo" />
        </picture>
        <div className="header__auth">
          <p className="header__user-email">{loggedIn && userEmail}</p>
          {loggedIn && (
            <Link
              className="header__auth-status"
              to="/signin"
              onClick={onSignOut}
            >
              Sair
            </Link>
          )}
          {!loggedIn && renderAuthLinks()}
        </div>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
