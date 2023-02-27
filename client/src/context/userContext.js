import React, { useContext, useEffect, useState } from "react";

import authServices from "../services/auth";

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogging, setIsLogging] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchUserLoginStatus = async () => {
      try {
        const user = await authServices.relog();

        if (!ignore) {
          setUser(user.user);
          setIsLoggedIn(true);
          setIsLogging(false);
        }
      } catch (error) {
        if (!ignore) {
          setIsLogging(false);
        }
      }
    };

    fetchUserLoginStatus();

    return () => {
      ignore = true;
    };
  }, []);

  let login = async (email, password) => {
    await authServices.login(email, password);

    window.location.reload();
  };

  let logout = async () => {
    await authServices.logout();

    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, isLogging, login, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
