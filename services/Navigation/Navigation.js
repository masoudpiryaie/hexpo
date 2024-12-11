import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "../../screens/Dashboard/HomeScreen";
import AddShop from "../../screens/AddShop";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={AddShop} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
