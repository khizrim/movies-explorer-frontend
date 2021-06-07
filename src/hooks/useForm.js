import { useState } from 'react';

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValidity, setFormValidity] = useState(false);

  function handleChange(e) {
    const { target } = e;
    const { name, value, validationMessage } = target;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validationMessage,
    });
  }

  function validateForm(e) {
    const { form } = e.target;
    setFormValidity(form.checkValidity());
  }

  function reset() {
    setValues({});
    setErrors({});
    setFormValidity({});
  }

  return {
    handleChange,
    validateForm,
    setValues,
    setFormValidity,
    reset,
    values,
    errors,
    formValidity,
  };
}

export default useForm;
