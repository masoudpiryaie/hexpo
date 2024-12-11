// MainScreen.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "../Dashboard/HomeScreen2";
import SettingScreen from "../Dashboard/SettingScreen";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../../services/AuthContext/AuthContext";
// import BottomTabNavigation from "../../components/BottomTabNavigation/BottomTabNavigation";



const MainScreen = () => {

    const { token } = useUserContext()
    return (
        <View>
            <Text>
                MainScreen
            </Text>
            <Text style={styles.text}>
                token: {token}
            </Text>



        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default MainScreen;
