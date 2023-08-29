import React from "react";

function SubmitButton({
  type,
  context = "",
  className,
  id,
  children,
  isFormValid,
}) {
  let classes = className;

  if (!isFormValid) {
    classes +=
      context === "auth" ? " button-auth_disabled" : " popup__button_disabled";
  } else {
    classes += context === "auth" ? " button-auth" : " popup__button";
  }

  return (
    <button type={type} className={classes} id={id} disabled={!isFormValid}>
      {children}
    </button>
  );
}

export default SubmitButton;
