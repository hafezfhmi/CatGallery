import { useState } from "react";

const useField = (type, id, defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
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

export default useField;
