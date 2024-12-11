// HomeScreen.js

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Pressable, Image, Button } from 'react-native';
import Icon from '../../components/Icon/Icon';
import axios from 'axios';
import { useFormData } from '../../services/FormDataContext/FormDataContext'
import CustomModal from '../../components/CustomModal/CustomModal';
import PieChart from 'react-native-pie-chart';
import DrawerNavigation from '../../components/DrawerNavigation/DrawerNavigation';
import Header from '../../components/Header/Header';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer'
import DrawerMenuContent from '../../components/DrawerMenuContent/DrawerMenuContent';
// import InquiryScreen from './InquiryScreen'
// import { Image } from 'expo-image';
import ReportScreen from './ReportScreen'
import AddShop from '../AddShop/AddShop';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';
import { useUserContext } from "../../services/AuthContext/AuthContext";
import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
// import { useUserContext } from "../../services/AuthContext/AuthContext";
import Modal from "react-native-modal";


const HomeScreen = ({ shop, navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('allShop');
    const [shopList, setShopList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedShopId, setSelectedShopId] = useState(null);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NzY2NTg4LCJleHAiOjE3MTU4NTI5ODh9.yMEF962WFussIgb4eAZTQ4I0WhcMvnSMRbYFjjygr98"
    const { shopData, updateShopList } = useFormData();
    const [shopStatus, setShopStatus] = useState(null);
    const [filteredShopList, setFilteredShopList] = useState([]);
    const [selectedShopName, setSelectedShopName] = useState(null);
    const widthAndHeight = 85;
    const series = [[85, 15], [89, 11], [75, 25]];
    const sliceColor = ['#556FF6', '#D5DBFD'];
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useUserContext()
    const { token } = useUserContext();

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODExMSwiaWF0IjoxNzI5NzAwNTAyLCJleHAiOjE3Mjk3ODY5MDJ9.oQIMd9EywPt7VxPoa_1-aizSwi__ZtM8p376wMNp_Zo'
    console.log('121212121212121212121212', token)
    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    useEffect(() => {
        fetchShopList();
    }, []);
    const sortShopList = (sortingOption) => {
        setSelectedOption(sortingOption);
        filterShopList(sortingOption);
    };

    const filterShopList = (sortingOption) => {
        let filteredList = [];
        if (sortingOption == 'allShop') {
            filteredList = shopList;
        } else {
            filteredList = shopList.filter(shop => {
                if (sortingOption == 'status1') {
                    return shop.status == 1;
                } else if (sortingOption == 'status2') {
                    return shop.status == 2;
                } else if (sortingOption == 'status3') {
                    return shop.status == 3;
                }
            });
        }
        setFilteredShopList(filteredList);
    };

    const fetchShopList = async () => {
        console.log('token', token)
        try {
            const response = await axios.post('http://172.16.100.49:4000/v1/shop/getmylist', {}, {
                headers: {
                    token: token
                }
            });
            const shopDataResponse = response.data.data
            setShopList(shopDataResponse);
            setFilteredShopList(shopDataResponse);
            setLoading(false);
            console.log('shopDataResponse: ', shopDataResponse)

        } catch (error) {
            setError('Error fetching shop list');
            setLoading(false);
            console.error('Error fetching shop list:', error);
        }
    };

    const handleShopPress = (shopId, shopName, status) => {
        setSelectedShopId(shopId);
        setSelectedShopName(shopName)
        setShopStatus(status)
        console.log('shopId:', shopId);
        const selectedShop = shopList.find(shop => shop.id == shopId);
        if (selectedShop) {
            updateShopList(selectedShop);
        } else {
            console.error('Selected shop not found in shop list');
        }
        setIsModalVisible(!isModalVisible);
    };

    const toggleSelectShopModal = () => {
        setIsModalVisible(!isModalVisible)
    }
    // const openDrawer = () => {
    //     setIsDrawerOpen(!isDrawerOpen)
    // }

    if (loading) {
        return <ActivityIndicator size="large" color="#24CAA1" />;
    }

    // if (error) {
    //     return <Text>{error}</Text>;
    // }
    // if (error) {
    //     return (

    //         <ReactNativeModal
    //             transparent={true}
    //             // isVisible={isVisible}
    //             style={{ margin: 0, padding: 0 }}
    //             // onBackdropPress={onClose}
    //             hasBackdrop={true}
    //             backdropColor="black"
    //             backdropOpacity='0.3'
    //         // animationInTiming={1000}
    //         ></ReactNativeModal>


    //     )
    // }
    console.log('shopStatus', shopStatus)
    console.log('tokssssssssssssssssssssen:  ', token)
    return (
        <>

            {/* <Header onMenuPress={toggleDrawer} /> */}
            <CustomDrawer isVisibles={isDrawerOpen} onClose={toggleDrawer}>
                <DrawerMenuContent />
            </CustomDrawer>

            <SafeAreaView style={styles.container}>
                <Modal
                    isVisible={error}
                    backdropOpacity={0.8}
                    backdropColor="black"
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    useNativeDriver
                    onBackdropPress={() => { }} // Prevent closing by tapping outside
                    onBackButtonPress={() => { }} // Prevent closing on back button
                >
                    <Text style={{ backgroundColor: '#fff', fontSize: 14, width: 200, height: 100, margin: 'auto', borderRadius: 8, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'IRANSansWeb', }}>
                        عدم ارتباط با سرور.
                        مجددا تلاش کنید ...
                    </Text>
                </Modal>
                <View style={styles.filterContainer}>
                    <View style={styles.filterIcon}>
                        <View>
                            <Text style={styles.filtertext}>
                                خوش آمدید!
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'IRANSansWeb' }}>
                                امتیاز شما 4.6
                            </Text>


                            <Icon name='magicStar' width={24} height={24} fill="#FFAC00" />
                        </View>
                    </View>
                </View>
                <Pressable style={[styles.filterContainer, { elevation: 7, shadowColor: 'rgba(0, 0, 0, 0.2)', }]} onPress={toggleSelectShopModal}>
                    {shopStatus === null ? (

                        <Text style={styles.selectYourShop}>فروشگاه خود را انتخاب کنید</Text>

                    ) : <Text style={{ fontFamily: 'IRANSansWeb' }}> {selectedShopName}</Text>}

                    <>
                        {shopStatus == 1 ? (
                            <View style={styles.shopSelection}>
                                <Icon name='tickCircle' width={24} height={24} fill='#24caa1' />
                                <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>تایید شده</Text>
                            </View>
                        ) : shopStatus == 2 ? (
                            <View style={styles.shopSelection}>
                                <Icon name='refreshCircle' width={24} height={24} fill='#FFAC00' />
                                <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>در انتظار تایید</Text>
                            </View>

                        ) : shopStatus == 3 ? (
                            <View style={styles.shopSelection}>
                                <Icon name='error' width={24} height={24} fill='red' />
                                <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>رد شده</Text>
                            </View>
                        ) : null
                        }
                    </>
                </Pressable>
                <View style={styles.shopContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 20 }}>
                        <View >
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series[0]}
                                sliceColor={sliceColor}
                                coverRadius={0.83}
                                coverFill={'#D5DBFD'}
                            />
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 48 }}>0.81%</Text>
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 15, fontSize: 12, }}>جواب استعلام</Text>
                        </View>
                        <View>
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series[1]}
                                sliceColor={sliceColor}
                                coverRadius={0.83}
                                coverFill={'#D5DBFD'}
                            />
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 48 }}>0.93%</Text>
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 15, fontSize: 12, }}>موجودی</Text>
                        </View>
                        <View>
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series[2]}
                                sliceColor={sliceColor}
                                coverRadius={0.83}
                                coverFill={'#D5DBFD'}
                            />
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 48 }}>0.67%</Text>
                            <Text style={{ fontFamily: 'IRANSansWeb', position: 'fix', alignSelf: 'center', bottom: 15, fontSize: 12, }}>عدم مرجوعی</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                        <CustomTouchableOpacity style={styles.walletContainer}>
                            <Icon name='wallet2' height={24} width={24} fill='#757575' />
                            <Text style={{ fontFamily: 'IRANSansWeb', paddingRight: 5, }}>کیف پول</Text>
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity style={styles.walletContainer}>
                            <Icon name='add' height={24} width={24} fill='#757575' />
                            <Text style={{ fontFamily: 'IRANSansWeb', paddingRight: 5, }}>ایجاد کالا</Text>
                        </CustomTouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomTouchableOpacity style={styles.walletContainer} onPress={toggleSelectShopModal}>
                            <Icon name='refresh2' height={24} width={24} fill='#fff' />
                            <Text style={{ fontFamily: 'IRANSansWeb', paddingRight: 5, }}>تغییر فروشگاه</Text>
                        </CustomTouchableOpacity>
                        <CustomTouchableOpacity style={styles.walletContainer} onPress={() => navigation.navigate('AddShop')}>
                            <Icon name='shop' height={24} width={24} fill='#757575' />
                            <Text style={{ fontFamily: 'IRANSansWeb', paddingRight: 5, }}>ایجاد فروشگاه</Text>
                        </CustomTouchableOpacity>

                    </View>
                    {isModalVisible && (
                        <CustomModal
                            isVisible={isModalVisible}
                            onClose={toggleSelectShopModal}
                            modalHeight='60%'
                        >

                            <View style={styles.modalContainer}>
                                <Pressable onPress={() => sortShopList('allShop')} style={[styles.sortingOption, selectedOption == 'allShop' && { borderBottomWidth: 5 }]}>
                                    <Text style={styles.sortOptionText}>همه فروشگاه‌ها</Text>
                                </Pressable>
                                <View style={styles.line} />
                                <Pressable onPress={() => sortShopList('status1')} style={[styles.sortingOption, selectedOption == 'status1' && { borderBottomWidth: 5 }]}>
                                    <Text style={styles.sortOptionText}>تایید شده</Text>
                                </Pressable>
                                <View style={styles.line} />
                                <Pressable onPress={() => sortShopList('status2')} style={[styles.sortingOption, selectedOption == 'status2' && { borderBottomWidth: 5 }]}>
                                    <Text style={styles.sortOptionText}>در انتظار تایید</Text>
                                </Pressable>
                                <View style={styles.line} />
                                <Pressable onPress={() => sortShopList('status3')} style={[styles.sortingOption, selectedOption == 'status3' && { borderBottomWidth: 5 }]}>
                                    <Text style={styles.sortOptionText}>رد شده</Text>
                                </Pressable>
                            </View>
                            <ScrollView style={{
                                paddingHorizontal: 40,
                                // paddingVertical: 20,
                                marginBottom: 140
                            }}>
                                {filteredShopList.map((shop) => (
                                    <Pressable
                                        style={[styles.shopListContainer,
                                        shop.id == selectedShopId ? styles.selectedShop : null
                                        ]}
                                        key={shop.id}
                                        onPress={() => handleShopPress(shop.id, shop.economic_name, shop.status)}
                                    >
                                        <Text style={[
                                            styles.shopList,
                                            shop.id == selectedShopId ? styles.selectedShopText : null]}
                                        >
                                            {shop.economic_name}
                                        </Text>
                                        <>
                                            {shop.status == 1 ? (
                                                <View style={styles.shopSelection}>
                                                    <Icon name='tickCircle' width={24} height={24} fill='#24caa1' />
                                                    <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>تایید شده</Text>
                                                </View>
                                            ) : shop.status == 2 ? (
                                                <View style={styles.shopSelection}>
                                                    <Icon name='refreshCircle' width={24} height={24} fill='#FFAC00' />
                                                    <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>در انتظار تایید</Text>
                                                </View>

                                            ) : (
                                                <View style={styles.shopSelection}>
                                                    <Icon name='error' width={24} height={24} fill='red' />
                                                    <Text style={{ paddingHorizontal: 5, fontFamily: 'IRANSansWeb', fontSize: 12 }}>رد شده</Text>
                                                </View>
                                            )}
                                        </>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </CustomModal>

                    )}
                </View>
                {/* {isDrawerOpen &&
                <Drawer />
            } */}
                <Image
                    style={styles.bannerImage}
                    source={require('../../assets/Image/dashBoardBanner.png')} />
            </SafeAreaView >
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        paddingTop: 18,
        alignItems: 'center',
        // height: "100%"
    },
    text: {
        fontFamily: 'IRANSansWeb',
        paddingRight: 24,
        paddingVertical: 16,
    }
    ,
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        width: '90%',
        height: 67,
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginBottom: 20,

    },
    filterIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    filtertext: {
        fontFamily: 'IRANSansWeb',
        fontSize: 16,
    },
    shopContainer: {
        justifyContent: 'center',
        width: '80%',
    },
    shopListSelected: {
        fontFamily: 'IRANSansWeb',
        paddingVertical: 10,
    },
    shopListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 58,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
    shopList: {
        fontFamily: 'IRANSansWeb',
        color: "#757575"
    },
    selectedShop: {
        backgroundColor: '#e2faf4',
    },
    selectedShopText: {
        color: '#24caa1',
    },
    shopSelection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectYourShop: {
        fontFamily: 'IRANSansWeb',
    },
    walletContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 145,
        height: 50,
        borderRadius: 10,
    },
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignContent: 'center',
        gap: 8,
    },
    sortingOption: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#24CAA1',
        paddingBottom: 10,
    },
    sortOptionText: {
        paddingVertical: 10,
        fontFamily: 'IRANSansWeb',
        paddingRight: 10,
    },
    bannerImage: {
        width: '90%',
        height: 170,
        resizeMode: 'contain',
        marginVertical: 20,
        borderRadius: 10,
    }
});
export default HomeScreen;
