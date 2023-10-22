import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  formType,
  setFormType,
}) {
  const {
    values,
    errors,
    isValid,
    inputActive,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormWithValidation(formType);

  const { nameClassesError, aboutClassesError, btnPopupSubmitClassError } =
    errorClasses(errors, isValid, inputActive, formType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
  };

  useEffect(() => {
    resetForm();
    setFormType("profile");
  }, [resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Editar Perfil"
      name="popup"
      formClassName="#popup__form"
    >
      <div className="popup__field">
        <Input
          name="name"
          type="text"
          placeholder="Insira o nome do Usuário"
          value={values.name || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          errors={errors.name}
          errorClassName={nameClassesError}
          className={`popup__input`}
        />
      </div>
      <div className="popup__field">
        <Input
          name="about"
          type="text"
          placeholder="Insira a sua Profissão"
          value={values.about || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("about")}
          errors={errors.about}
          errorClassName={aboutClassesError}
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

export default EditProfilePopup;
