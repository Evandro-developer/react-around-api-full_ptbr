import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import closeIconSmall from "../images/close_icon_small.svg";
import closeIcon from "../images/close_icon.svg";

function PopupWithForm({
  activePopup,
  isMounted,
  setIsMounted,
  isClosing,
  setIsClosing,
  handleClosePopup,
  formClassName,
  title,
  children,
}) {
  const { t } = useContext(LangContext);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && activePopup) {
      handleClosePopup();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup__opened")) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (activePopup) {
      setIsMounted(true);
      setIsClosing(false);

      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    } else {
      setIsClosing(true);

      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activePopup, isMounted]);

  return (
    <section
      className={`popup ${activePopup ? "popup__opened" : ""} ${
        isClosing ? "popup__closed" : ""
      }`}
    >
      <div className="popup__opened" onClick={handleClickOutside} />
      <form
        className={`popup__form ${formClassName}`}
        id={formClassName}
        noValidate
      >
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt={t("default.closeIcon")}
            className="popup__closed-btn"
            onClick={handleClosePopup}
          />
        </picture>
        <h2 className="popup__heading">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
