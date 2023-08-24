import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import buttonEditSmall from "../images/button_edit_small.png";
import buttonEdit from "../images/button_edit.png";
import buttonAddLarge from "../images/button_add_large.png";
import buttonAdd from "../images/button_add.png";
import buttonUpdateAvatar from "../images/button_update_avatar.svg";

function Profile({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__avatar-edit">
          <picture>
            <img
              src={currentUser?.avatar}
              alt="Imagem do Avatar"
              className="profile__avatar"
              id="profile__avatar"
              style={{
                backgroundImage: `url(${currentUser?.avatar})`,
              }}
            />
          </picture>
          <picture>
            <img
              src={buttonUpdateAvatar}
              alt="Imagem do button editar avatar"
              className="button-avatar-edit"
              id="button-avatar-edit"
              onClick={onEditAvatarClick}
            />
          </picture>
        </div>
        <div className="profile__briefing">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <h2 className="profile__subtitle">{currentUser?.about}</h2>
          <picture>
            <source media="(max-width: 768px)" srcSet={buttonEditSmall} />
            <img
              className="button-edit"
              src={buttonEdit}
              alt="Imagem do button editar"
              id="button-edit"
              onClick={onEditProfileClick}
            />
          </picture>
        </div>
      </div>
      <picture>
        <source media="(max-width: 768px)" srcSet={buttonAddLarge} />
        <img
          src={buttonAdd}
          alt="Imagem de button adicionar"
          className="button-add"
          id="button-add"
          onClick={onAddPlaceClick}
        />
      </picture>
    </div>
  );
}

export default Profile;
