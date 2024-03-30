import React, { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

import buttonEditSmall from "../images/button_edit_small.svg";
import buttonEdit from "../images/button_edit.svg";
import buttonAddLarge from "../images/button_add_large.svg";
import buttonAdd from "../images/button_add.svg";
import buttonUpdateAvatar from "../images/button_update_avatar.svg";

function Profile({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick }) {
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__avatar-edit">
          <picture>
            <img
              src={currentUser?.avatar}
              alt={t("profile.avatarImage")}
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
              alt={t("profile.editBtnImage")}
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
            <source media="(max-width: 608px)" srcSet={buttonEditSmall} />
            <img
              className="button-edit"
              src={buttonEdit}
              alt={t("profile.btnImage")}
              id="button-edit"
              onClick={onEditProfileClick}
            />
          </picture>
        </div>
      </div>
      <picture>
        <source media="(max-width: 608px)" srcSet={buttonAddLarge} />
        <img
          src={buttonAdd}
          alt={t("profile.addBtnImage")}
          className="button-add"
          id="button-add"
          onClick={onAddPlaceClick}
        />
      </picture>
    </section>
  );
}

export default Profile;
