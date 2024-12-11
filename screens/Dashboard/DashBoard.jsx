import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Header from '../../components/Header/Header'
import Icon from '../../components/Icon/Icon';
import ReportScreen from "./ReportScreen";
// import InquiryScreen from "./InquiryScreen";
import HomeScreen from "./HomeScreen";
import OrderScreen from "./OrderScreen";
import MyAccount from './MyAccount';
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer";
import DrawerMenuContent from "../../components/DrawerMenuContent/DrawerMenuContent";
import DrawerNavigation from "../../components/DrawerNavigation/DrawerNavigation";
import AddShop from "../AddShop/AddShop";
import { createStackNavigator } from '@react-navigation/stack';
import Alert from "../../components/Alert/Alert";
import InquiryScreen from "./Inquiry/InquiryScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddShop" component={AddShop} />
        </Stack.Navigator>
    );
}

const DashBoard = () => {
    <>
        {/* <Text>dfdssdfsf</Text> */}
    </>
    // const [isDrawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open/close

    // const renderHeader = (navigation, title) => {
    //   return (
    //     <Header
    //       title={title}
    //       left={<Icon name="menu" size={30} onPress={() => setDrawerOpen(true)} />} // Open drawer on icon press
    //       right={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Text style={{ marginRight: 10 }}>Custom View</Text>
    //         <Icon name="menu" width={24} height={24} />
    //       </View>}
    //     />
    //   );
    // };

    const renderTab = (name, component, tabBarLabel, iconName) => {
        return (
            <Tab.Screen
                name={name}
                component={component}
                options={({ navigation }) => ({
                    headerShown: false,
                    tabBarLabel,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon name={focused ? `${iconName}Green` : iconName} width={24} height={24} fill={focused ? '#24caa1' : '#757575'} />
                    ),
                })}
            />
        );
    };

    return (
        <>
            <Alert />
            <Tab.Navigator
                screenOptions={{

                    tabBarStyle: {
                        position: 'absolute',
                        borderTopWidth: 1,
                        borderTopColor: "#fff",
                        height: 70,
                        paddingBottom: 10,
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                    },
                }}
                initialRouteName="HomeScreen"
                tabBarOptions={{
                    activeTintColor: "#24caa1",
                    labelStyle: styles.labelTab,
                }}
            >
                {renderTab("ReportScreen", ReportScreen, "گزارشات", "chartSquare")}
                {renderTab("InquiryScreen", InquiryScreen, "استعلام‌ها", "massageTime")}
                {renderTab("HomeScreen", HomeScreen, "داشبورد", "dashboard")}
                {renderTab("OrderScreen", OrderScreen, "سفارش‌ها", "document")}
                {renderTab("MyAccount", MyAccount, "حساب من", "user")}

            </Tab.Navigator>

        </>

    );
};

const styles = StyleSheet.create({
    labelTab: {
        fontFamily: 'IRANSansWeb',
        fontSize: 12,
    },
});

export default DashBoard;