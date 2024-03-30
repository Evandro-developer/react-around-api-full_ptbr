import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useFormWithValidation from "./FormValidation";
import { errorClasses } from "../utils/globalValidationRules";
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit";

function AddPlacePopup({
  onAddPlace,
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

  const { placeClassesError, linkClassesError, btnPopupSubmitClassError } =
    errorClasses(errors, isValid, inputActive, formType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ placeName: values.placeName, link: values.link });
    handleClosePopup();
  };

  useEffect(() => {
    resetForm();
    setFormType("place");
  }, [resetForm]);

  return (
    <>
      <div className="popup__field">
        <Input
          name="placeName"
          type="text"
          placeholder={t("addPlacePopup.placeNamePlaceholder")}
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
          placeholder={t("addPlacePopup.imageUrlPlaceholder")}
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
        onClick={handleSubmit}
      >
        {t("default.saveButton")}
      </ButtonSubmit>
    </>
  );
}

export default AddPlacePopup;
