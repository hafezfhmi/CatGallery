import { useState } from "react";

export const useField = (type, id) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    attributes: {
      type,
      id,
      value,
      onChange,
    },
    reset,
    error,
    setError,
  };
};

export const useError = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleError = (errorState, errorMessage) => {
    setError(errorState);
    setErrorMsg(errorMessage);
  };

  const disableError = () => {
    setError(false);
    setErrorMsg("");
  };

  return { handleError, disableError, error, errorMsg };
};

export const useFileDrop = () => {
  const [image, setImage] = useState(null);

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return {
    areaDrop: { onDrop: handleOnDrop, onDragOver: handleDragOver },
    inputDrop: {
      onChange: handleInputChange,
    },
    value: image,
  };
};
