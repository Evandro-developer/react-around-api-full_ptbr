import React, { useEffect, useState, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import closeIconSmall from "../images/close_icon_small.svg";
import closeIcon from "../images/close_icon.svg";

function ImagePopup({ selectedCard, onCloseImageClick }) {
  const { t } = useContext(LangContext);
  const [isClosing, setIsClosing] = useState(false);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && selectedCard && !isClosing) {
      startClosingAnimation();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("img-popup-card__opened") && !isClosing) {
      startClosingAnimation();
    }
  };

  const startClosingAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onCloseImageClick();
    }, 300);
  };

  useEffect(() => {
    if (selectedCard) {
      window.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedCard, isClosing]);

  if (!selectedCard && !isClosing) {
    return null;
  }

  return (
    <section
      className={`img-popup-card ${
        isClosing ? "img-popup-card" : "img-popup-card__opened"
      }`}
      id="img-popup-card"
    >
      <div className="img-popup-card__container" id="img-popup-card__container">
        <picture>
          <img
            type="url"
            src={selectedCard.link}
            alt={selectedCard.placeName}
            className="img-popup-card__image"
          />
        </picture>
        <h2 className="img-popup-card__title">{selectedCard.placeName}</h2>
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt={t("default.closeIcon")}
            className="img-popup-card__closed-btn"
            id="img-popup-card__closed-btn"
            onClick={startClosingAnimation}
          />
        </picture>
      </div>
    </section>
  );
}

export default ImagePopup;
