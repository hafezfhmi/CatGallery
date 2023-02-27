import { useState } from "react";

const useError = () => {
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

export default useError;
