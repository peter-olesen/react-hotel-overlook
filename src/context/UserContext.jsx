import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (userData?.access_token) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
    if (!userData) {
      if (sessionStorage.getItem("userData")) {
        setUserData(JSON.parse(sessionStorage.getItem("userData")));
      }
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
