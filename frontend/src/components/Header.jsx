import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import logo from "../images/logo.svg";
import logoSmall from "../images/logo_small.svg";

function Header({ loggedIn, userEmail, onSignOut }) {
  const { t, lang, setLang } = useContext(LangContext);
  const languages = ["en", "pt"];
  const location = useLocation();

  const langButtons = languages.map((langOption, index) => (
    <React.Fragment key={langOption}>
      <span
        className={`header__lang ${lang === langOption ? "selected" : ""}`}
        onClick={() => handleLangClick(langOption)}
      >
        {langOption.toUpperCase()}
      </span>
      {index < languages.length - 1 && " | "}
    </React.Fragment>
  ));

  const handleLangClick = (langOption) => {
    if (lang !== langOption) {
      setLang(langOption);
    }
  };

  return (
    <header className="header">
      <div className="header__user-panel">
        <div className="header__branding">
          <picture>
            <source media="(max-width: 608px)" srcSet={logoSmall} />
            <img
              src={logo}
              alt="Logo Around The U.S."
              className="header__logo"
            />
          </picture>
          <div className="header__lang-switch">{langButtons}</div>
        </div>
        <div className="header__auth">
          <p className="header__user-email">{loggedIn && userEmail}</p>
          {loggedIn ? (
            <Link
              className="header__auth-status"
              to="/signin"
              onClick={onSignOut}
            >
              {t("header.logout")}
            </Link>
          ) : (
            <Link
              className="header__auth-status"
              to={location.pathname === "/signin" ? "/signup" : "/signin"}
            >
              {t(
                location.pathname === "/signin"
                  ? "header.signup"
                  : "header.login"
              )}
            </Link>
          )}
        </div>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
