import React, { useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { globalValidationConfig } from "./globalValidationConfig";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const name = currentUser?.name;
  const about = currentUser?.about;
  const nameTouched = false;
  const aboutTouched = false;

  const { name: nameConfig, about: aboutConfig } = globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    about: aboutConfig,
  };

  const {
    formData,
    setFormData,
    validity,
    validationMessage,
    inputActive,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    isFormValid,
  } = FormValidator(validationConfig, { name, about });

  const resetForm = () => {
    setFormData({ name: "", about: "" });
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return;
    }
    onUpdateUser({ name: formData.name, about: formData.about });
  }

  function renderError(fieldName) {
    if (
      !validity[fieldName] &&
      (inputActive[fieldName] ||
        ((fieldName === "name" ? nameTouched : aboutTouched) &&
          !formData[fieldName]))
    ) {
      return (
        <span
          className={`popup__input-error popup-input-type-${fieldName}-error ${
            !validity[fieldName] ? "popup__error_visible" : ""
          }`}
        >
          {!formData[fieldName]
            ? validationConfig[fieldName].errorMessage
            : validationMessage[fieldName]}
        </span>
      );
    }
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      onSubmit={handleSubmit}
      title="Editar Perfil"
      name="popup"
      formClassName="popup__form"
    >
      <label className="popup__field">
        <TextInput
          type="text"
          context="popup"
          fieldName="name"
          validity={validity}
          inputActive={inputActive}
          value={formData.name}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("name")}
          onBlur={() => handleInputBlur("name")}
          placeholder={currentUser?.name}
        />
        {renderError("name")}
      </label>
      <label className="popup__field">
        <TextInput
          type="text"
          context="popup"
          fieldName="about"
          validity={validity}
          inputActive={inputActive}
          value={formData.about}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("about")}
          onBlur={() => handleInputBlur("about")}
          placeholder={currentUser?.about}
        />
        {renderError("about")}
      </label>
      <SubmitButton
        type="submit"
        className="popup__button"
        id="popup__button"
        isFormValid={isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
