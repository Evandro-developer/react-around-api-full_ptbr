import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupMapping } from "../utils/popupHelpers";

function PopupController({
  formType,
  setFormType,
  activePopup,
  currentUser,
  onUpdateAvatar,
  onUpdateUser,
  onAddPlace,
  onConfirm,
  isClosing,
  setIsClosing,
  isMounted,
  setIsMounted,
  handleClosePopup,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [popupDetails, setPopupDetails] = useState({});
  const popupMapping = usePopupMapping();

  const PopupComponent = popupMapping[activePopup].component;

  useEffect(() => {
    const details = popupMapping[activePopup].details;
    setPopupDetails(details);
    setIsLoading(false);
  }, [activePopup]);

  if (isLoading) {
    return null;
  }

  return (
    <PopupWithForm
      activePopup={activePopup}
      isClosing={isClosing}
      setIsClosing={setIsClosing}
      isMounted={isMounted}
      setIsMounted={setIsMounted}
      handleClosePopup={handleClosePopup}
      formClassName={popupDetails.formClassName}
      title={popupDetails.title}
    >
      {PopupComponent && (
        <PopupComponent
          formType={formType}
          setFormType={setFormType}
          currentUser={currentUser}
          onUpdateAvatar={onUpdateAvatar}
          onUpdateUser={onUpdateUser}
          onAddPlace={onAddPlace}
          onConfirm={onConfirm}
          handleClosePopup={handleClosePopup}
        />
      )}
    </PopupWithForm>
  );
}

export default PopupController;
