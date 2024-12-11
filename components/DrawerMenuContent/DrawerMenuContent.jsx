import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, Button } from 'react-native';
import Icon from '../Icon/Icon';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Dashboard/HomeScreen';
// import SettingScreen from '../../screens/Dashboard/SettingScreen';
import ReportScreen from '../../screens/Dashboard/ReportScreen';
// import InquiryScreen from '../../screens/Dashboard/InquiryScreen';
import MyAccount from '../../screens/Dashboard/MyAccount';
import { useNavigation } from '@react-navigation/native';
import AddShop from '../../screens/AddShop/AddShop';
import SettingScreen from '../../screens/Dashboard/SettingScreen';
// import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import { CommonActions } from '@react-navigation/native';
import { useFormData } from '../../services/FormDataContext/FormDataContext';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useUserContext } from '../../services/AuthContext/AuthContext';
// const navigation = useNavigation();
const Stack = createStackNavigator();

const DrawerMenuContent = ({ props }) => {
    const navigation = useNavigation();
    const [openItem, setOpenItem] = useState(null);
    // const { formData, updateFormData } = useFormData();
    const { formData, updateFormData } = useFormData();
    const { shopData } = useFormData();
    const { logout } = useUserContext();

    // console.log('shopData', shopData)
    let menuItems = [
        {
            id: '0',
            icon: 'shop',
            label: 'فروشگاه های من',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'ایجاد فروشگاه جدید', screen: 'AddShop' },
            ]
        },
        {
            id: '1',
            icon: 'shop',
            label: 'کفش فروشی',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'قرارداد فروشگاه', screen: 'Contract' },
                { id: '2', icon: 'reDash', label: 'تنظیمات ارسال', screen: 'SendingSetting' },
                { id: '3', icon: 'reDash', label: 'مدیریت کالا', screen: 'ProductManagment' },
                { id: '4', icon: 'reDash', label: 'ایجاد کالای جدید', screen: 'AddProduct' },
                { id: '5', icon: 'reDash', label: ' ایجاد فروشگاه جدید', screen: 'AddShop' },
            ]
        },
        {
            id: '2',
            icon: 'massage',
            label: 'استعلام‌های مشتریان',
            screen: 'InquiryScreen'
        },
        {
            id: '3',
            icon: 'document',
            label: 'سفارش‌های مشتریان',
            screen: 'ReportScreen'
        },
        {
            id: '4',
            icon: 'wallet2',
            label: 'کیف پول ',
            screen: 'Wallet'
        },
        {
            id: '5',
            icon: 'chartSquare',
            label: 'گزارشات',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'کالا‌های مرجوعی', screen: 'InquiryScreen' },
                { id: '2', icon: 'reDash', label: 'گزارش فروش', screen: 'SellReport' },
                { id: '3', icon: 'reDash', label: 'گردش حساب', screen: 'TurnOver' },
            ]
        },
        {
            id: '6',
            icon: 'messageQuestion',
            label: 'پرسش‌ها',
            screen: 'Questions'
        },
        {
            id: '7',
            icon: 'massage',
            label: 'پیام‌ها',
            screen: 'Massages'
        },
        {
            id: '8',
            icon: 'videoPlayer',
            label: 'کمپین‌های تبلیغاتی',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'کمپین‌های تبلیغاتی من', screen: 'Mycampaigns' },
                { id: '2', icon: 'reDash', label: 'ایجاد کمپین‌های تبلیغاتی', screen: 'Newcampaign' },
            ]
        },
        {
            id: '9',
            icon: 'headPhone',
            label: 'پشتیبانی',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'تیکت‌ها', screen: 'Tickets' },
                { id: '2', icon: 'reDash', label: 'اعلان‌ها', screen: 'Support' },
            ]
        },
        {
            id: '10',
            icon: 'infoCircle',
            label: 'راهنما',
            screen: 'Info'
        },
        {
            id: '11',
            icon: 'subscribtion',
            label: 'اشتراک',
            subMenuItems: [
                { id: '1', icon: 'reDash', label: 'اشتراک‌های من', screen: 'MySubscribtion' },
                { id: '2', icon: 'reDash', label: 'خرید اشتراک', screen: 'BuySubscribtion' },
            ]
        },
        {
            id: '12',
            icon: 'logout',
            label: 'خروج',
            screen: 'Logout'
        },
    ]
    if (!shopData) {
        menuItems = menuItems.filter(item => item.id !== '1');
    } else {
        menuItems = menuItems.filter(item => item.id !== '0');
    }

    const openMenuOpen = () => {
        setOpenItem(!openItem);
        setOpenSubItem(false)
    }

    const subMenuOpen = () => {
        setOpenItem(!openSubItem)
    }

    const handleItemPress = (itemId, screenName, subMenuItems) => {
        if (itemId === '12') { // Check if item is Logout
            logout(); // Call logout function
            return;
        }
        if (openItem === itemId) {
            setOpenItem(null);
        } else {
            setOpenItem(itemId);
            if (subMenuItems && subMenuItems.length > 0) {
                return;
            } else if (screenName) {
                navigation.dispatch(CommonActions.navigate(screenName));
            }
        }
    };

    const handleSubItemPress = (screenName) => {
        if (screenName) {
            navigation.dispatch(CommonActions.navigate(screenName));

        }
    };
    const renderItem = ({ item }) => {

        const isOpen = openItem === item.id;
        // console.log('screenName')
        return (
            <View>
                {/* <AddShop /> */}
                <TouchableOpacity
                    activeOpacity={0.7}

                    style={[
                        styles.listItemContainer,
                        isOpen && styles.openListItemContainer,
                    ]}
                    onPress={() => handleItemPress(item.id, item.screen, item.subMenuItems)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name={item.icon} height={24} width={24} fill={isOpen ? '#24CAA1' : '#757575'} />
                        <Text style={[styles.menuTextItem, isOpen && styles.greenText]}>{item.label}</Text>
                    </View>
                    {item.subMenuItems && <Icon name={isOpen ? 'arrowDown' : 'left'} height={24} width={24} fill={isOpen ? '#24CAA1' : '#757575'} />}

                </TouchableOpacity>
                {isOpen && item.subMenuItems && (
                    <FlatList
                        data={item.subMenuItems}
                        renderItem={({ item: subItem }) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleSubItemPress(subItem.screen)}
                                style={styles.subMenuItem}>
                                <View style={styles.iconWithItem}>
                                    <Icon name='reDash' height={14} width={14} fill='#757575' />
                                    <Text style={styles.menuTextItem}>{subItem.label}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(subItem) => subItem.id}
                    />
                )}
            </View>
        );

    };

    return (
        <View style={styles.container}>
            <Text style={styles.sidebarMenuHeader}>پنل فروشنده</Text>
            <View style={styles.devider} />

            <View style={styles.walletContainer}>
                <Text style={styles.walletContainerText}>موجودی کیف پول: </Text>
                <Text style={styles.walletAmount}>۰ تومان</Text>
                <Icon name='wallet2' height={24} width={24} fill='#757575' />
            </View>
            <View style={[styles.devider, { borderColor: '#F9F9F9' }]} />
            <View style={styles.listItems}>
                <FlatList
                    data={menuItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    sidebarMenuHeader: {
        textAlign: 'center',
        fontFamily: 'IRANSansWeb',
        fontSize: 16,
    },
    devider: {
        borderTopWidth: 1.6,
        borderTopColor: '#EDEDED',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    walletContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    walletContainerText: {
        fontFamily: 'IRANSansWeb',
        fontSize: 12,
        color: '#757575',
    },
    walletAmount: {
        fontFamily: 'IRANSansWeb',
        fontSize: 12,
        paddingHorizontal: 5,
    },
    listItems: {
        flexDirection: 'column',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 25,
    },
    listItemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingVertical: 15,
        padding: 15,

    },
    openListItemContainer: {
        backgroundColor: '#E2FAF4',
        borderRadius: 12,
        // padding: 10,

    },
    iconWithItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuTextItem: {
        fontFamily: 'IRANSansWeb',
        paddingRight: 10,
        color: '#757575'
    },
    greenText: {
        color: '#24CAA1'
    },
    subMenuItem: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        paddingVertical: 15,
    },
});


export default DrawerMenuContent;