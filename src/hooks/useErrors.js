import { useState } from 'react';

const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const setError = ({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === 'email');

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  };

  const removeError = (field) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== field));
  };

  const getErrorMessageByFieldName = (fieldName) => {
    const errorMessage = errors.find((error) => error.field === fieldName)?.message;
    return errorMessage;
  };

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
};

export default useErrors;
