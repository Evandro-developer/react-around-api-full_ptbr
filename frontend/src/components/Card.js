import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import trashIcon from "../images/trash_icon.svg";
import heartIconDisabled from "../images/heart_icon_disabled.png";
import heartIconEnabled from "../images/heart_icon_enabled.png";

function Card({ card, onCardImageClick, onCardTrashClick, onCardLikeClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  //console.log("currentUser:", currentUser);

  const isOwner = card.owner._id === currentUser?._id;
  // console.log("IsOwner", isOwner);

  const [isLiked, setIsLiked] = useState(
    card.likes.some((i) => i._id === currentUser?._id)
  );
  //console.log("isLiked:", isLiked);

  const heartIcon = isLiked ? heartIconEnabled : heartIconDisabled;

  const handleLikeClick = async () => {
    await onCardLikeClick(card);
    setIsLiked(!isLiked);
  };

  return (
    <ul className="card">
      <picture>
        <img
          src={trashIcon}
          alt="Icone de remoção para lixeira"
          className={`button-trash-icon ${
            isOwner && "button-trash-icon__visible"
          }`}
          onClick={() => onCardTrashClick(card)}
        />
      </picture>
      <picture>
        <img
          src={card.link}
          alt={`Imagem do local ${card.name}`}
          className="card__image"
          onClick={() => onCardImageClick(card)}
        />
      </picture>
      <li className="card__briefing">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <img
            src={heartIcon}
            alt={
              isLiked
                ? "Icon de coração ativado com preenchimento"
                : "Icon de coração desativado apenas com bordas"
            }
            className="button-heart-icon"
            onClick={handleLikeClick}
          />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
