import React, { useEffect } from "react";

import closeIconSmall from "../images/close_icon_small.png";
import closeIcon from "../images/close_icon.png";

function ImagePopup({ selectedCard, onCloseImageClick }) {
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      onCloseImageClick();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("img-popup-card__opened")) {
      onCloseImageClick();
    }
  };

  useEffect(() => {
    if (selectedCard) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedCard]);

  if (!selectedCard) {
    return null;
  }

  return (
    <section
      className={`img-popup-card ${
        selectedCard ? "img-popup-card__opened" : ""
      }`}
      id="img-popup-card"
    >
      <div className="img-popup-card__container" id="img-popup-card__container">
        <picture>
          <img
            type="url"
            src={selectedCard.link}
            alt={selectedCard.name}
            className="img-popup-card__image"
          />
        </picture>
        <h2 className="img-popup-card__title">{selectedCard.name}</h2>
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt="Imagem do ícone de fechamento da janela do popup"
            className="img-popup-card__closed-btn"
            id="img-popup-card__closed-btn"
            onClick={onCloseImageClick}
          />
        </picture>
      </div>
    </section>
  );
}

export default ImagePopup;
