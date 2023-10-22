import React, { useState, useEffect } from "react";
import closeIconSmall from "../images/close_icon_small.png";
import closeIcon from "../images/close_icon.png";

function PopupWithForm({
  isOpen,
  formClassName,
  onClose,
  onSubmit,
  title,
  children,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const closeWithAnimation = (callback) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (typeof callback === "function") {
        callback();
      }
      onClose();
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeWithAnimation(onSubmit);
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isOpen) {
      closeWithAnimation(onClose);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup__opened") && isOpen) {
      closeWithAnimation(onClose);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    } else if (!isOpen && isMounted) {
      setIsClosing(true);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, isMounted]);

  if (!isMounted && !isClosing) {
    return null;
  }

  return (
    <section
      className={`popup ${isOpen ? "popup__opened" : ""} ${
        isClosing ? "popup__closed" : ""
      }`}
    >
      <div className="popup__opened" onClick={handleClickOutside} />
      <form
        className={`popup__form ${formClassName}`}
        id={formClassName}
        noValidate
        onSubmit={handleSubmit}
      >
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt="Imagem do ícone de fechamento da janela do popup"
            className="popup__closed-btn"
            onClick={closeWithAnimation}
          />
        </picture>
        <h2 className="popup__heading">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
