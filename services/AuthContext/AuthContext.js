import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoginWithPassword, setIsLoginWithPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [formError, setFormError] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  const saveToken = async (authToken) => {
    console.log("Auth token before saving:", authToken);
    if (authToken !== undefined) {
      try {
        await SecureStore.setItemAsync("userToken", authToken);
        setToken(authToken);
        console.log("Auth token saved successfully:", authToken);
        setIsLoggedIn(1);
      } catch (error) {
        console.error("Error saving token:", error);
      }
    }
  };

  const deleteToken = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      setToken("");
      setIsLoggedIn(2);
      console.log("Token deleted successfully.");
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  const login = (token) => {
    console.log("Login called with token:", token);
    saveToken(token);
  };

  const logout = () => {
    console.log("Logout called.");
    deleteToken();
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        console.log("Retrieved token:", storedToken);
        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(1);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        isSignUp,
        setIsSignUp,
        isLoginWithPassword,
        setIsLoginWithPassword,
        phoneNumber,
        setPhoneNumber,
        password,
        setPassword,
        verifyCode,
        setVerifyCode,
        formError,
        setFormError,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
