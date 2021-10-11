import {useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [profileName, setProfileName, removeProfileName] = useCookies(["userName"]);
  const token = cookies.token;
  const username = profileName.userName;

  const setToken = (newToken) => setCookies("token", newToken, { path: "/" });
  const setUsername = (newName) => setProfileName("userName", newName, { path: "/" });
  const deleteToken = () => removeCookies("token");
  const deleteUsername = () => removeProfileName("userName");
  function logout(){
    setToken("");
    removeCookies("token");
    setUsername("")
    removeCookies("userName")
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        deleteToken,
        username,
        setUsername,
        deleteUsername,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
