import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const  authenContext = createContext();

export default function AuthenContextProvider({ children }) {
  const [token, setToken] = useState(undefined);
  const [profileData, setProfileData] = useState(undefined);

  // each Refresh (token = null) => to check localStorage
  useEffect(() => {
    const userToken = localStorage.getItem("TokenUser");
    if (userToken != undefined) {
      setToken(userToken);
      setProfileData(jwtDecode(userToken));
    }
  }, [token]);

  return (
    <>
      <authenContext.Provider value={{ token, setToken, profileData }}>
        {children}
      </authenContext.Provider>
    </>
  );
}
