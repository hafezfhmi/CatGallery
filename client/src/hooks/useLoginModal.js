import { useState } from "react";
import { useUserContext } from "../context/userContext";

const useLoginModal = () => {
  const [showLogin, setShowLogin] = useState(false);
  const userCtx = useUserContext();

  const checkLogin = () => {
    if (!userCtx.isLoggedIn) {
      setShowLogin(true);
    }
  };

  const disableLoginModal = () => {
    setShowLogin(false);
  };

  return {
    showLogin,
    isLoggedIn: userCtx.isLoggedIn,
    checkLogin,
    disableLoginModal,
  };
};

export default useLoginModal;
