import React from "react";

function Input({
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  errorClassName,
  className,
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => onBlur(name)}
        required
        className={className}
      />
      {errors && <span className={`${errorClassName}`}>{errors}</span>}
    </div>
  );
}

export default Input;
