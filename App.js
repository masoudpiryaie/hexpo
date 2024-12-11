import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./services/AuthContext/AuthContext";
import { FormDataProvider } from "./services/FormDataContext/FormDataContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import AppRoutes from "./AppRoutes"; // Import the route handler component
import * as Font from "expo-font";
import { I18nManager } from "react-native";
import Routes from "./Routes/Route";
import { PaperProvider } from "react-native-paper";

// Enable RTL layout direction
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const loadFont = async () => {
  await Font.loadAsync({
    IRANSansWeb: require("./assets/fonts/IRANSansWeb.ttf"),
  });
};

export default function App() {
  useEffect(() => {
    loadFont();
  }, []);

  return (
    <PaperProvider>
      <FormDataProvider>
        <UserProvider>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </SafeAreaProvider>
        </UserProvider>
      </FormDataProvider>
    </PaperProvider>
  );
}

//////////////////////////////////////////////////////////////
// import React, { useEffect } from "react";
// import { StatusBar, StyleSheet, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// // import BottomTabNavigation from "./components/BottomTabNavigation/BottomTabNavigation";
// import {
//   UserProvider,
//   useUserContext,
// } from "./services/AuthContext/AuthContext";
// import { FormDataProvider } from "./services/FormDataContext/FormDataContext";
// import * as Font from "expo-font";
// import { I18nManager } from "react-native";
// // import HomeScreen from "./screens/Dashboard/HomeScreen2"; // Import HomeScreen
// import LoginWithMobile from "./screens/Login/Login";
// import InquiryScreen from "./screens/Dashboard/InquiryScreen";
// import MainScreen from "./screens/MainScreen/MainScreen";
// import Header from "./components/Header/Header";
// import Map from "./components/Map/Map";
// // import Dashboard from "./screens/Dashboard/DashBoard";
// // import DrawerNavigation from "./components/DrawerNavigation/DrawerNavigation";
// import HomeScreen from "./screens/Dashboard/HomeScreen";
// import ReportScreen from "./screens/Dashboard/ReportScreen";
// import DrawerNavigation from "./components/DrawerNavigation/DrawerNavigation";
// import Stacknavigation from "./services/StackNavigation.js/Stacknavigation";
// import AddShopPages from "./screens/AddShop/AddShopPages";
// import DashBoard from "./screens/Dashboard/DashBoard";
// import DrawerNavigator from "./screens/Dashboard/DashBoard";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// // import TestScreen from "./screens/TestScreen/TestScreen";
// // import MapComponent from "./components/LeafletMAp/LeafletMap";

// // Enable RTL layout direction
// I18nManager.forceRTL(true);
// I18nManager.allowRTL(true);

// const loadFont = async () => {
//   await Font.loadAsync({
//     IRANSansWeb: require("./assets/fonts/IRANSansWeb.ttf"),
//   });
// };

// const Stack = createStackNavigator();

// export default function App() {
//   // const { token } = useUserContext();
//   // const { token } = useUserContext();
//   // console.log("toekkkken", token);
//   // Load font when component mounts
//   useEffect(() => {
//     loadFont();
//   }, []);

//   return (
//     <FormDataProvider>
//       <UserProvider>
//         <SafeAreaProvider>
//           {/* <View style={styles.container}></View> */}
//           <StatusBar barStyle="dark-content" backgroundColor="white" />
//           {/* <Header /> */}
//           <NavigationContainer>
//             {/* <Stack.Navigator initialRouteName="HomeScreen">
//             <Stack.Screen name="HomeScreen" component={HomeScreen} />
//             <Stack.Screen name="ReportScreen" component={ReportScreen} />
//           </Stack.Navigator> */}
//             {/* <DashBoard /> */}
//             {/* <HomeScreen /> */}
//             {/* <TestScreen /> */}
//             <DrawerNavigation />
//             {/* <Stacknavigation /> */}
//             {/* <LoginWithMobile /> */}
//             {/* <AddShopPages /> */}
//             {/* <BottomTabNavigation /> */}
//           </NavigationContainer>
//           {/* <Map /> */}
//         </SafeAreaProvider>
//       </UserProvider>
//     </FormDataProvider>
//   );
// }

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//     alignItems: "center", // Center horizontally
//     justifyContent: "center", // Center vertically
//     alignItems: "center",
//   },
// });

// // import React, { useState } from "react";
// // import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// // import * as SecureStore from "expo-secure-store";

// // const SecureStoreExample = () => {
// //   const [key, setKey] = useState("");
// //   const [value, setValue] = useState("");
// //   const [storedValue, setStoredValue] = useState("");

// //   const saveValue = async () => {
// //     if (key && value) {
// //       await SecureStore.setItemAsync(key, value);
// //       alert("Value saved successfully!");
// //     } else {
// //       alert("Please enter both a key and a value");
// //     }
// //   };

// //   const getValue = async () => {
// //     if (key) {
// //       const result = await SecureStore.getItemAsync(key);
// //       setStoredValue(result || "No value found");
// //     } else {
// //       alert("Please enter a key");
// //     }
// //   };

// //   const deleteValue = async () => {
// //     if (key) {
// //       await SecureStore.deleteItemAsync(key);
// //       alert("Value deleted successfully!");
// //       setStoredValue("");
// //     } else {
// //       alert("Please enter a key");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Expo Secure Store Example</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Key"
// //         value={key}
// //         onChangeText={setKey}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Value"
// //         value={value}
// //         onChangeText={setValue}
// //         secureTextEntry
// //       />
// //       <View style={styles.buttonContainer}>
// //         <Button title="Save" onPress={saveValue} />
// //         <Button title="Retrieve" onPress={getValue} />
// //         <Button title="Delete" onPress={deleteValue} />
// //       </View>
// //       <Text style={styles.result}>Stored Value: {storedValue}</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     marginBottom: 20,
// //     textAlign: "center",
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     padding: 10,
// //     marginVertical: 10,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     marginVertical: 20,
// //   },
// //   result: {
// //     textAlign: "center",
// //     fontSize: 18,
// //     marginTop: 20,
// //   },
// // });

// // export default SecureStoreExample;
