import React, { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import ButtonSubmit from "./ButtonSubmit";

function ConfirmationPopup({ onConfirm, handleClosePopup }) {
  const { t } = useContext(LangContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
    handleClosePopup();
  };

  return (
    <>
      <ButtonSubmit
        className="popup__button popup__button_with-confirmation"
        id="popup__button_with-confirmation"
        shouldValidate={false}
        onClick={handleSubmit}
      >
        {t("confirmationPopup.button")}
      </ButtonSubmit>
    </>
  );
}

export default ConfirmationPopup;
