import React from "react";

function TextInput({
  type = "text",
  context = "",
  fieldName,
  validity,
  inputActive,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
}) {
  let classes = context === "popup" ? "popup__input" : "auth-container__input";

  if (!validity[fieldName]) {
    classes +=
      context === "popup"
        ? " popup__input_type_error"
        : " auth-container__input_type_error";
  }

  if (inputActive[fieldName]) {
    classes +=
      context === "popup"
        ? " popup__input_active"
        : " auth-container__input_active";
  }

  return (
    <input
      context={""}
      type={type}
      className={classes}
      name={fieldName}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
}

export default TextInput;
