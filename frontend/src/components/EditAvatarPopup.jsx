import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function EditAvatarPopup({
  onUpdateAvatar,
  formType,
  setFormType,
  handleClosePopup,
}) {
  const { t } = useContext(LangContext);

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
    handleClosePopup();
  };

  useEffect(() => {
    resetForm();
    setFormType("avatar");
  }, [resetForm]);

  return (
    <>
      <div className="popup__field">
        <Input
          name="avatar"
          type="text"
          placeholder={t("editAvatarPopup.avatarPlaceholder")}
          value={values.avatar}
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
        onClick={handleSubmit}
      >
        {t("default.saveButton")}
      </ButtonSubmit>
    </>
  );
}

export default EditAvatarPopup;
