import { useState, useCallback } from "react";
import {
  useValidationConfig,
  requiredFieldsConfig,
  validateInput,
} from "../utils/globalValidationRules";

function useForm(formType) {
  const validationConfig = useValidationConfig();

  // Inicializa o estado inputActive com todos os campos de useValidationConfig()
  // Initializes the inputActive state with all fields from useValidationConfig()
  const initialInputActiveState = Object.keys(validationConfig).reduce(
    (initialInputs, key) => {
      initialInputs[key] = false;
      return initialInputs;
    },
    {}
  );

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputActive, setInputActive] = useState(initialInputActiveState);

  // Manipula a mudança no input e valida o campo
  // Handles the change in input and validates the field
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    // Atualiza o valor e o erro
    // Updates the value and the error
    const errorMessage = validateInput(name, value, validationConfig);
    const updatedValues = { ...values, [name]: value };
    const updatedErrors = { ...errors, [name]: errorMessage };

    // Verifica se todos os campos obrigatórios são válidos
    // Checks if all required fields are valid
    const requiredFields = requiredFieldsConfig[formType];
    const allFieldsValid = requiredFields.every(
      (field) => !updatedErrors[field] && updatedValues[field]
    );

    updateStates(updatedValues, updatedErrors, allFieldsValid, name);
  };

  const updateStates = (newValues, newErrors, allFieldsValid, name) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(allFieldsValid);
    setInputActive((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setInputActive({ ...inputActive, [name]: false });
  };

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

// Pode aprimorar o useForm com funcionalidades adicionais específicas para validação
// Can enhance useForm with additional specific functionalities for validation
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
