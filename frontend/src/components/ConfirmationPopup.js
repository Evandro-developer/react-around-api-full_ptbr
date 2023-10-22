import React from "react";

import PopupWithForm from "./PopupWithForm";
import ButtonSubmit from "./ButtonSubmit";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  const handleSubmit = () => {
    onConfirm();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Tem certeza?"
      name="popup_with-confirmation"
      formClassName="popup__form_with-confirmation"
    >
      <ButtonSubmit
        className="popup__button popup__button_with-confirmation"
        id="popup__button_with-confirmation"
        shouldValidate={false}
      >
        Sim
      </ButtonSubmit>
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
