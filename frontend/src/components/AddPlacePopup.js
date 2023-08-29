import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import FormValidator from "./FormValidator";
import { globalValidationConfig } from "./globalValidationConfig";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const name = false;
  const link = false;
  const nameTouched = false;
  const linkTouched = false;

  const { name: nameConfig, link: linkConfig } = globalValidationConfig;
  const validationConfig = {
    name: nameConfig,
    link: linkConfig,
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
  } = FormValidator(validationConfig, { name, link });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const resetForm = () => {
    setFormData({ name: "", link: "" });
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    onAddPlace({
      name: formData.name,
      link: formData.link,
    });
  };

  function renderError(fieldName) {
    if (
      !validity[fieldName] &&
      (inputActive[fieldName] ||
        ((fieldName === "name" ? nameTouched : linkTouched) &&
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
      title="Novo Local"
      name="popup_card-add"
      formClassName="popup__form_card-add"
    >
      <label className="popup__field">
        <TextInput
          context="popup"
          type="text"
          fieldName="name"
          validity={validity}
          inputActive={inputActive}
          value={formData.name}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("name")}
          onBlur={() => handleInputBlur("name")}
          placeholder="Insira o nome do Novo Local"
        />
        {renderError("name")}
      </label>
      <label className="popup__field">
        <TextInput
          context="popup"
          type="url"
          fieldName="link"
          validity={validity}
          inputActive={inputActive}
          value={formData.link}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("link")}
          onBlur={() => handleInputBlur("link")}
          placeholder="Insira o URL da Imagem"
        />
        {renderError("link")}
      </label>

      <SubmitButton
        type="submit"
        className="popup__button"
        id="popup__button_card-add"
        isFormValid={isFormValid()}
      >
        Salvar
      </SubmitButton>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
