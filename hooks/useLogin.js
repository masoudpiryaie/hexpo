import { useState } from "react";
import fetchApi from "./services/fetchApi"; // Adjust the import path as necessary

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const loginWithPass = async (phoneNumber, password) => {
    console.log("send sms");
    setLoading(true);

    try {
      const response = await fetchApi.post("/auth", {
        mobile: phoneNumber,
        password: password,
      });

      if (response.data.state === true) {
        const token = response.data.data.authToken;
        console.log("authToken: ", token);

        setAuthToken(token);
        authTokenRef.current = token;
        login(token);

        console.log("authTokenRef.current: ", authTokenRef.current);
        setNewToken(token);

        console.log("newToken: ", newToken);
        setIsLoggedIn(1);
      } else {
        Alert.alert("رمز وارد شده اشتباه است");
        console.log("رمز اشتباه است");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("ارور");
    } finally {
      setLoading(false);
    }
  };

  return { loginWithPass, loading, authToken };
};

export default useLogin;
