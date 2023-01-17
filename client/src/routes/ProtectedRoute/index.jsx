import React from "react";
import { UseUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userCtx = UseUserContext();

  if (userCtx.isLogging) {
    return;
  }

  if (!userCtx.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
