import React from "react";

function TextInput({
  type = "text",
  fieldName,
  validity,
  inputActive,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
}) {
  let classes = "popup__input";

  if (!validity[fieldName]) {
    classes += " popup__input_type_error";
  }
  if (inputActive[fieldName]) {
    classes += " popup__input_active";
  }

  return (
    <input
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
