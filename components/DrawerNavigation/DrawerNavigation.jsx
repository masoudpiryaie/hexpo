// DrawerNavigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import CustomHeader from './CustomHeader'; // Import your custom header component
import { View, Text } from 'react-native'; // Import view and text components
// import HomeScreen from '../../screens/Dashboard/HomeScreen'; // Import your home screen component
import MyAccount from '../../screens/Dashboard/MyAccount'; // Import your my account screen component
// import SettingsScreen from '../../screens/Dashboard/'; // Import your settings screen component
import Icon from '../Icon/Icon';
import Header from '../Header/Header'; // Import your header
import DrawerMenuContent from '../DrawerMenuContent/DrawerMenuContent';
import AddShop from '../../screens/AddShop/AddShop';
// import DashBoard from '../../screens/Dashboard/DashBoard';
import AddProduct from '../../screens/AddProduct';
import BuySubscribtion from '../../screens/BuySubscribtion';
import CreateCampaign from '../../screens/CreateCampaign';
import Info from '../../screens/Info';
import Massages from '../../screens/Massages';
import MyCampaign from '../../screens/MyCampaign';
import MySubscribtion from '../../screens/MySubscribtion';
import Notifications from '../../screens/Notifications';
import ProductManaging from '../../screens/ProductManaging';
import Questions from '../../screens/Questions';
import ReturnedProduct from '../../screens/ReturnedProduct';
import SalesReport from '../../screens/SalesReport';
import SendingSetting from '../../screens/SendingSetting';
import ShopContract from '../../screens/ShopContract';
import Ticket from '../../screens/Ticket';
import Turnover from '../../screens/Turnover';
import Wallet from '../../screens/Wallet/Wallet';
import AddShopPages from '../../screens/AddShop/AddShopPages';
import DashBoard from '../../screens/Dashboard/DashBoard';
import Logout from '../../screens/Logout/Logout';
import GardeshWallet from '../../screens/Wallet/GardeshWallet';
// import HomeScreen from '../../screens/Dashboard/HomeScreen';
// import DashBoard from '../../screens/Dashboard/DashBoard';
// import DashBoard from '../../screens/Dashboard/DashBoard';
// import DashBoard from '../../screens/Dashboard/DashBoard';
// import DashBoard from '../../screens/Dashboard/DashBoard';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (

    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenuContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: "80%",
        },
      }}
    >
      {/* <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
      /> */}
      <Drawer.Screen
        name="DashBoard"
        component={DashBoard}
      />
      <Drawer.Screen
        name="AddProduct"
        component={AddProduct} />
      <Drawer.Screen
        name="AddShop"
        component={AddShop} />
      <Drawer.Screen
        name="AddShopPages"
        component={AddShopPages} />
      <Drawer.Screen
        name="BuySubscribtion"
        component={BuySubscribtion} />
      <Drawer.Screen
        name="CreateCampaign"
        component={CreateCampaign} />
      <Drawer.Screen
        name="Info"
        component={Info} />
      <Drawer.Screen
        name="Massages"
        component={Massages} />
      <Drawer.Screen
        name="MyCampaign"
        component={MyCampaign} />
      <Drawer.Screen
        name="MySubscribtion"
        component={MySubscribtion} />
      <Drawer.Screen
        name="Notifications"
        component={Notifications} />
      <Drawer.Screen
        name="ProductManaging"
        component={ProductManaging} />
      <Drawer.Screen
        name="Questions"
        component={Questions} />
      <Drawer.Screen
        name="ReturnedProduct"
        component={ReturnedProduct} />
      <Drawer.Screen
        name="SalesReport"
        component={SalesReport} />
      <Drawer.Screen
        name="SendingSetting"
        component={SendingSetting} />
      <Drawer.Screen
        name="ShopContract"
        component={ShopContract} />
      <Drawer.Screen
        name="Ticket"
        component={Ticket} />
      <Drawer.Screen
        name="Turnover"
        component={Turnover} />
      <Drawer.Screen
        name="Wallet"
        component={Wallet} />
      <Drawer.Screen
        name="DrawerMenuContent"
        component={DrawerMenuContent} />
      <Drawer.Screen
        name="GardeshWallet"
        component={GardeshWallet} />
      {/* <Drawer.Screen
        name="Logout"
        component={Logout} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;