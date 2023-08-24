import React from "react";

import closeIconSmall from "../images/close_icon_small.png";
import closeIcon from "../images/close_icon.png";

function ImagePopup({ selectedCard, onCloseImageClick }) {
  if (!selectedCard) {
    return null;
  }

  const closeImagePopup = () => {
    onCloseImageClick();
  };

  return (
    <section
      className={`img-popup-card ${selectedCard && "img-popup-card__opened"}`}
      id="img-popup-card"
    >
      <div className="img-popup-card__container" id="img-popup-card__container">
        <picture>
          <img
            type="url"
            src={selectedCard ? selectedCard.link : "#"}
            alt={selectedCard ? selectedCard.name : "#"}
            className="img-popup-card__image"
          />
        </picture>
        <h2 className="img-popup-card__title">
          {selectedCard ? selectedCard.name : ""}
        </h2>
        <picture>
          <source media="(max-width: 580px)" srcSet={closeIconSmall} />
          <img
            src={closeIcon}
            alt="Imagem do ícone de fechamento da janela do popup"
            className="img-popup-card__closed-btn"
            id="img-popup-card__closed-btn"
            onClick={closeImagePopup}
          />
        </picture>
      </div>
    </section>
  );
}

export default ImagePopup;
