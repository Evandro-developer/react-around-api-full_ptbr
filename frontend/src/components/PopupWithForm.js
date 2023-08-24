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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClosing(true);
    onSubmit();
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setIsClosing(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setIsClosing(true);
        setIsMounted(true);
        onClose();
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <section
      className={`popup ${isOpen ? "popup__opened" : ""} ${
        isClosing ? "popup__closed" : ""
      }`}
    >
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
            onClick={handleClose}
          />
        </picture>
        <h2 className="popup__heading">{title}</h2>
        {children}
      </form>
    </section>
  );
}

export default PopupWithForm;
