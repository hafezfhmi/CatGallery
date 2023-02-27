import { useUserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged = true, children }) => {
  const userCtx = useUserContext();

  if (userCtx.isLogging) {
    return;
  }

  if (isLogged) {
    if (!userCtx.isLoggedIn) {
      return <Navigate to="/auth/login" />;
    }

    return children;
  } else {
    if (userCtx.isLoggedIn) {
      return <Navigate to={"/"} />;
    }

    return children;
  }
};

export default ProtectedRoute;
