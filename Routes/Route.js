import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useUserContext } from "./services/AuthContext/AuthContext";
// import LoginWithMobile from "./screens/Login/Login";
// import DrawerNavigation from "./components/DrawerNavigation/DrawerNavigation";
import { useUserContext } from "../services/AuthContext/AuthContext";
import DrawerNavigation from "../components/DrawerNavigation/DrawerNavigation";
import LoginWithMobile from "../screens/Login/Login";
import { createStackNavigator } from "@react-navigation/stack";

// Stack navigation creation
const Stack = createStackNavigator();

// Public Routes (Unauthenticated users)
function PublicRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginWithMobile}
        options={{ headerShown: false }}
      />
      {/* You can add more public routes like signup, forgot password, etc. */}
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
}

// Private Routes (Authenticated users)
function PrivateRoutes() {
  return <DrawerNavigation />;
}
export default function Routes() {
  const { token } = useUserContext(); // Retrieve the token
  console.log("tttttttttttttttttttttttt", token);
  return (
    <PrivateRoutes />
    // token ? <PrivateRoutes /> : <PublicRoutes />
  );
}
