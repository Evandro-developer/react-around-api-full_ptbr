import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
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

  const { avatarClassesError, btnPopupSubmitClassError } = errorClasses(
    errors,
    isValid,
    inputActive,
    formType
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  useEffect(() => {
    resetForm();
    setFormType("avatar");
  }, [resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      onSubmit={handleSubmit}
      title="Alterar a foto do perfil"
      name="popup_avatar-edit"
      formClassName="popup__form_avatar-edit"
    >
      <div className="popup__field">
        <Input
          name="avatar"
          type="text"
          placeholder="Insira o URL do novo avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("avatar")}
          errors={errors.avatar}
          errorClassName={avatarClassesError}
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

export default EditAvatarPopup;
