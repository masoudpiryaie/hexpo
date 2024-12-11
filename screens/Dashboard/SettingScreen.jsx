import React from "react";
import { View, Text, StyleSheet, DrawerLayoutAndroid, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header/Header";
// import DrawerContent from "../../components/DrawerContent/DrawerContent.jsx";
import { useNavigation } from '@react-navigation/native';
// import ErrorSvg from "../../components/Icon/Icon.js";

const SettingScreen = () => {
    const drawerRef = React.useRef(null);
    const navigation = useNavigation();

    const openDrawer = () => {
        drawerRef.current.openDrawer();
    };


    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>settingscreen</Text>
            <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
                <Text>Open Drawer</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigateToScreen('HomeScreen')}>
                <Text>Go to Home Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigateToScreen('SettingScreen')}>
                <Text>Go to user Setting Screen</Text>
            </TouchableOpacity>
        </View>

        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        height: 100,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    header_title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    userInfo: {
        width: "100%",
        height: 100,
        backgroundColor: "#fafafa",
        alignItems: "center",
        justifyContent: "center",
    },
    userInfoText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
});
export default SettingScreen;