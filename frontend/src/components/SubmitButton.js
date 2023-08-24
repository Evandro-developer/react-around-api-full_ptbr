import React from "react";

function SubmitButton({ type, className, id, children, isFormValid }) {
  let classes = className;

  if (!isFormValid) {
    classes += " popup__button_disabled";
  }

  return (
    <button type={type} className={classes} id={id} disabled={!isFormValid}>
      {children}
    </button>
  );
}

export default SubmitButton;
