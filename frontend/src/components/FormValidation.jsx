import { useState, useCallback, useEffect } from "react";
import {
  validationConfig,
  requiredFieldsConfig,
  validateInput,
} from "../utils/globalValidationRules";

// Inicializa o estado inputActive com todos os campos de validationConfig
const initialInputActiveState = Object.keys(validationConfig).reduce(
  (initialInputs, key) => {
    initialInputs[key] = false;
    return initialInputs;
  },
  {}
);

// useForm é um hook personalizado para validação de formulários
function useForm(formType) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputActive, setInputActive] = useState(initialInputActiveState);

  // Manipula a mudança no input e valida o campo
  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    const errorMessage = validateInput(name, value);

    const newValues = { ...values, [name]: value };
    const newErrors = { ...errors, [name]: errorMessage };

    // Atualiza os estados de values e errors
    setValues(newValues);
    setErrors(newErrors);

    // Verifica se todos os campos obrigatórios são válidos
    const requiredFields = requiredFieldsConfig[formType] || [];
    const allFieldsValid = requiredFields.every((field) => {
      return !newErrors[field] && newValues[field];
    });

    setIsValid(allFieldsValid);
    setInputActive({ ...inputActive, [name]: true });
  };

  // Manipula o evento de desfocar do input
  const handleBlur = (name) => {
    setInputActive({ ...inputActive, [name]: false });
  };

  // Reseta o formulário para o estado inicial ou valores fornecidos
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    inputActive,
    isValid,
    setValues,
    setErrors,
    setInputActive,
    setIsValid,
    handleChange,
    handleBlur,
    resetForm,
  };
}

// Aprimora o useForm com funcionalidades adicionais específicas para validação
function useFormWithValidation(formType) {
  const formControl = useForm(formType);

  const handleChange = (evt) => {
    formControl.handleChange(evt);
  };

  return {
    ...formControl,
    handleChange,
  };
}

export default useFormWithValidation;
