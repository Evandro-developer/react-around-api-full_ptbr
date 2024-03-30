import React, { useContext, useState, useEffect } from "react";
import { LangContext } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import trashIcon from "../images/trash_icon.svg";
import heartIconDisabled from "../images/heart_icon_disabled.svg";
import heartIconEnabled from "../images/heart_icon_enabled.svg";

function Card({ card, onCardImageClick, onCardTrashClick, onCardLikeClick }) {
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const isOwner = card.owner._id === currentUser?._id;
  const heartIcon = isLiked ? heartIconEnabled : heartIconDisabled;

  const handleLikeClick = async () => {
    setAnimationClass("fade-out");
    setTimeout(async () => {
      await onCardLikeClick(card);
      setIsLiked(!isLiked);
      setAnimationClass("fade-in");
      setTimeout(() => {
        setAnimationClass("");
      }, 100);
    }, 100);
  };

  useEffect(() => {
    setIsLiked(card.likes.some((i) => i._id === currentUser?._id));
  }, [card, currentUser]);

  return (
    <ul className="card">
      <picture>
        <img
          src={trashIcon}
          alt={t("card.trashIconAlt")}
          className={`button-trash-icon ${
            isOwner && "button-trash-icon__visible"
          }`}
          onClick={() => onCardTrashClick(card)}
        />
      </picture>
      <picture>
        <img
          src={card.link}
          alt={`Imagem do local ${card.placeName}`}
          className="card__image"
          onClick={() => onCardImageClick(card)}
        />
      </picture>
      <li className="card__briefing">
        <h2 className="card__title">{card.placeName}</h2>
        <div className="card__like-container">
          <img
            src={heartIcon}
            alt={
              isLiked
                ? t("card.heartIconActivatedAlt")
                : t("card.heartIconDeactivatedAlt")
            }
            className={`button-heart-icon ${animationClass}`}
            onClick={handleLikeClick}
          />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
