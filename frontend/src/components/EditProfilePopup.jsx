import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function EditProfilePopup({
  onUpdateUser,
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

  const { nameClassesError, aboutClassesError, btnPopupSubmitClassError } =
    errorClasses(errors, isValid, inputActive, formType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
    handleClosePopup();
  };

  useEffect(() => {
    resetForm();
    setFormType("profile");
  }, [resetForm]);

  return (
    <>
      <div className="popup__field">
        <Input
          name="name"
          type="text"
          placeholder={t("editProfilePopup.namePlaceholder")}
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
          placeholder={t("editProfilePopup.professionPlaceholder")}
          value={values.about || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("about")}
          errors={errors.about}
          errorClassName={aboutClassesError}
          className={`popup__input`}
        />
      </div>
      <ButtonSubmit
        type="submit"
        className={btnPopupSubmitClassError}
        isValid={isValid}
        onClick={handleSubmit}
      >
        {t("default.saveButton")}
      </ButtonSubmit>
    </>
  );
}

export default EditProfilePopup;
