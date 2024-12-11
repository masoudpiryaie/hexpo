import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native"; // Import view and text components
import AddShopPages from "../../screens/AddShop/AddShopPages";
import Info from "../../screens/Info";
import SendingSetting from "../../screens/SendingSetting";
import ShopContract from "../../screens/ShopContract";
import Turnover from "../../screens/Turnover";
import DrawerNavigation from "../../components/DrawerNavigation/DrawerNavigation";
import AddShop from "../../screens/AddShop/AddShop";

const Stack = createStackNavigator();

export default function Stacknavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="AddShop" component={AddShop} />
      <Stack.Screen name="AddShopPages" component={AddShopPages} /> */}
    </Stack.Navigator>
  );
}
