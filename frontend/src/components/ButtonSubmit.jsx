import React from "react";

function ButtonSubmit({
  className,
  isValid,
  onClick,
  children,
  shouldValidate = true,
}) {
  return (
    <button
      type="submit"
      className={className}
      disabled={shouldValidate ? !isValid : false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonSubmit;
