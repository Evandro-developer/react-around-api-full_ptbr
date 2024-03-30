import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import api from "../api/Api";

// Mapeamento de configurações de popups / Popup settings mapping
export const usePopupMapping = () => {
  const { t } = useContext(LangContext);

  return {
    // Configurações para edição de perfil / Settings for profile editing
    editProfile: {
      component: EditProfilePopup,
      details: {
        formClassName: "popup__form",
        title: t("editProfilePopup.title"),
      },
    },
    // Configurações para edição de avatar / Settings for avatar editing
    editAvatar: {
      component: EditAvatarPopup,
      details: {
        formClassName: "popup__form_avatar-edit",
        title: t("editAvatarPopup.title"),
      },
    },
    // Configurações para adicionar um novo local / Settings for adding a new place
    addPlace: {
      component: AddPlacePopup,
      details: {
        formClassName: "popup__form_card-add",
        title: t("addPlacePopup.title"),
      },
    },
    // Configurações para confirmação / Settings for confirmation
    confirmation: {
      component: ConfirmationPopup,
      details: {
        formClassName: "popup__form_with-confirmation",
        title: t("confirmationPopup.title"),
      },
    },
  };
};

// Manipuladores de eventos para abrir popups
// Event handlers for opening popups
export const handleEditAvatarClick = (setActivePopup) => {
  setActivePopup("editAvatar");
};

export const handleEditProfileClick = (setActivePopup) => {
  setActivePopup("editProfile");
};

export const handleAddPlaceClick = (setActivePopup) => {
  setActivePopup("addPlace");
};

export const handleCardDeleteClick = (
  card,
  setCardToDelete,
  setActivePopup
) => {
  setCardToDelete(card);
  setActivePopup("confirmation");
};

// Função para fechar popups com animação
// Function to close popups with animation
export const closeWithAnimation = (setIsClosing, setOpenState, callback) => {
  setIsClosing(true);
  setTimeout(() => {
    setIsClosing(false);
    setOpenState(false);
    if (callback) callback();
  }, 300);
};

// Funções de Gerenciamento de Dados para popups
// Data Management Functions for popups
export const updateUser = (newUser, setCurrentUser) => {
  return api.addNewUserInfo(newUser.name, newUser.about).then((updatedUser) => {
    setCurrentUser(updatedUser);
  });
};

export const updateAvatar = (newAvatar, setCurrentUser) => {
  return api.addNewUserInfoAvatar(newAvatar.avatar).then((updatedAvatar) => {
    setCurrentUser(updatedAvatar);
  });
};

export const addPlace = (newCard, setCardsList, cards) => {
  return api.addNewCard(newCard.placeName, newCard.link).then((newCard) => {
    setCardsList([newCard, ...cards]);
  });
};

export const deleteCardConfirm = (
  cardToDelete,
  setCardsList,
  setCardToDelete
) => {
  if (cardToDelete) {
    return api.deleteCard(cardToDelete._id).then(() => {
      setCardsList((state) => state.filter((c) => c._id !== cardToDelete._id));
      setCardToDelete(null);
    });
  }
};
