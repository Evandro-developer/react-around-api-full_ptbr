import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";
import { globalValidationConfig } from "./globalValidationConfig";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarTouched = false;
  const { avatar: avatarConfig } = globalValidationConfig;
  const validationConfig = {
    avatar: avatarConfig,
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
  } = FormValidator(validationConfig, { avatar: "" });

  const resetForm = () => {
    setFormData({ avatar: "" });
  };

  function handleSubmit() {
    if (!isFormValid()) {
      return;
    }
    onUpdateAvatar({
      avatar: formData.avatar,
    });
  }

  function renderError(fieldName) {
    if (
      !validity[fieldName] &&
      (inputActive[fieldName] || (avatarTouched && !formData[fieldName]))
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
      title="Alterar a foto do perfil"
      name="popup_avatar-edit"
      formClassName="popup__form_avatar-edit"
    >
      <label className="popup__field">
        <TextInput
          context="popup"
          type="url"
          fieldName="avatar"
          validity={validity}
          inputActive={inputActive}
          value={formData.avatar}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("avatar")}
          onBlur={() => handleInputBlur("avatar")}
          placeholder="Insira o URL do Avatar"
        />
        {renderError("avatar")}
      </label>
      <SubmitButton
        type="submit"
        className="popup__button"
        id="popup__button_avatar-edit"
        isFormValid={isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
