import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Profile from "./Profile";
import ImagePopup from "./ImagePopup";
import Card from "./Card";

function Main({
  api,
  cards,
  setCardsList,
  selectedCard,
  setSelectedCard,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardTrashClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const newCard = isLiked
      ? await api.removeLike(card._id)
      : await api.addLike(card._id);

    setCardsList((state) =>
      state.map((c) => (c._id === card._id ? newCard : c))
    );
  };

  return (
    <main>
      <Profile
        onEditAvatarClick={onEditAvatarClick}
        onEditProfileClick={onEditProfileClick}
        onAddPlaceClick={onAddPlaceClick}
      />
      <ImagePopup
        selectedCard={selectedCard}
        onCloseImageClick={() => setSelectedCard(null)}
      />

      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardImageClick={() => setSelectedCard(card)}
            onCardTrashClick={() => onCardTrashClick(card)}
            onCardLikeClick={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
