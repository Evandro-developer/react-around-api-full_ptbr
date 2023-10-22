import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function AddPlacePopup({ isOpen, onClose, onAddPlace, formType, setFormType }) {
  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation(formType);

  const { placeClassesError, linkClassesError, btnPopupSubmitClassError } =
    errorClasses(errors, isValid, inputActive, formType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ placeName: values.placeName, link: values.link });
  };

  useEffect(() => {
    resetForm();
    setFormType("place");
  }, [resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Novo Local"
      name="popup_card-add"
      formClassName="popup__form_card-add"
    >
      <div className="popup__field">
        <Input
          name="placeName"
          type="text"
          placeholder="Insira o nome do novo local"
          value={values.placeName || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("placeName")}
          errors={errors.placeName}
          errorClassName={placeClassesError}
          className={`popup__input`}
        />
      </div>
      <div className="popup__field">
        <Input
          name="link"
          type="text"
          placeholder="Insira o URL da Imagem"
          value={values.link || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("link")}
          errors={errors.link}
          errorClassName={linkClassesError}
          className={`popup__input`}
        />
      </div>
      <ButtonSubmit
        className={btnPopupSubmitClassError}
        isValid={isValid}
        onClick={(e) => handleSubmit(e)}
      >
        Salvar
      </ButtonSubmit>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
