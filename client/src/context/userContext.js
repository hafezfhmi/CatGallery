import React, { useContext, useEffect, useState } from "react";

import authServices from "../services/auth";

const UserContext = React.createContext();

export function UseUserContext() {
  return useContext(UserContext);
}

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogging, setIsLogging] = useState(true);

  useEffect(() => {
    const fetchUserLoginStatus = async () => {
      try {
        const userLoginStatus = await authServices.relog();

        setUser(userLoginStatus.user);
        setIsLoggedIn(userLoginStatus.isLoggedIn);
        setIsLogging(false);
      } catch (error) {
        setIsLogging(false);
      }
    };

    fetchUserLoginStatus();
  }, []);

  let login = async (email, password) => {
    let userLoginStatus = await authServices.login(email, password);

    if (userLoginStatus.isLoggedIn) {
      setUser(userLoginStatus.user);
      setIsLoggedIn(userLoginStatus.isLoggedIn);
    }
  };

  let logout = async () => {
    await authServices.logout();

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, isLogging, login, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
