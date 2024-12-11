import { View, StyleSheet, Text, Image } from 'react-native';
import React, { useState } from 'react';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';
import Icon from '../../components/Icon/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import walletImage from '../../assets/wallet.png';
import { Badge, Divider } from 'react-native-paper';
import BackButton from '../../components/BackButton/BackButton';
import { useNavigation } from '@react-navigation/native';

const Wallet = () => {
    const navigation = useNavigation();


    const [backToHome, setBackToHome] = useState(false);
    const handleBack = () => {
        setBackToHome(true);
        // You might want to navigate back or perform an action here when backToHome is true
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <BackButton route="DashBoard" label="کیف پول" />
            <View style={styles.formContainer}>
                <Image
                    source={walletImage}
                    style={styles.images}
                />
                <View style={styles.rowContainer}>
                    <CustomTouchableOpacity style={styles.walletContainer}>
                        <Icon name='add' height={24} width={24} fill='#24caa1' />
                        <Text style={styles.walletText}>شارژ کیف پول</Text>
                    </CustomTouchableOpacity>




                    <CustomTouchableOpacity style={styles.walletContainer}>
                        <Icon name='wallet2' height={24} width={24} fill='#24caa1' />
                        <Text style={styles.walletText}>برداشت کیف پول</Text>
                    </CustomTouchableOpacity>
                    <CustomTouchableOpacity style={styles.walletContainer}>
                        <Icon name='trendDown' height={24} width={24} fill='#24caa1' />
                        <Text style={styles.walletText}>هزینه کرد از کیف پول</Text>
                    </CustomTouchableOpacity>
                </View>
                {/* <CustomTouchableOpacity style={styles.walletContainer} onPress={() => navigation.navigate('AddShop')}>
                    <Icon name='shop' height={24} width={24} fill='#757575' />
                    <Text style={{ fontFamily: 'IRANSansWeb', paddingRight: 5, }}>ایجاد فروشگاه</Text>
                </CustomTouchableOpacity> */}
                <CustomTouchableOpacity style={styles.addNewShop} onPress={() => navigation.navigate('GardeshWallet')}>
                    <Icon name='convertCard' width={24} height={24} fill='#24caa1' />
                    <Text style={styles.addNewShopText}>گردش حساب کیف پول</Text>
                </CustomTouchableOpacity>
                {/* <Bad4ge>3</Badge> */}
                {/* Repeated elements centered in ScrollView */}
                {Array.from({ length: 3 }).map((_, index) => {
                    const backgroundColor = index === 0 ? '#E3F2FD' : index === 1 ? '#FFEBEE' : '#E8F5E9';

                    return (
                        <View key={index} style={[styles.infoContainer]}>
                            <Text style={styles.simpleText}>میزان برداشت از کیف پول شما</Text>
                            <Text style={styles.smallText}>در ۳۰ روز گذشته</Text>
                            <View style={styles.textIcon}>
                                <Icon name='emptyWalletChangeBlue' height={24} width={24} fill='#2F89F5' />
                                <Text style={[styles.walletText, { color: index === 0 ? "#2F89F5" : index === 1 ? "#DF3C4E" : "#2FC26A", fontSize: 14 }]}>
                                    100000 تومان                                </Text>
                            </View>
                            <Divider style={{ width: 178 }} />
                            {/* <View style={{
                                margin: 20,
                                borderBottomWidth: 1,
                                width: 178,                                // marginVertical: 16,
                                borderRadius: 8,
                                borderColor: '#EDEDED',
                            }}></View> */}
                        </View>
                    );
                })}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingTop: 18,
        paddingBottom: 10,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '92%',
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginBottom: 40,
        alignItems: 'center',
        paddingBottom: 20,

    },
    images: {
        width: 350,
        height: 200,
        marginTop: 32,
        resizeMode: 'contain',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        width: '100%',
    },
    walletContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 105,
        height: 100,
        margin: 5,
        borderRadius: 10,
        elevation: 10
    },
    walletText: {
        fontFamily: 'IRANSansWeb',
        paddingTop: 8,
        fontSize: 11,
        textAlign: 'center',
    },
    addNewShop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        borderWidth: 1,
        height: 48,
        marginVertical: 16,
        borderRadius: 8,
        borderColor: '#24caa1',
    },
    addNewShopText: {
        color: '#24caa1',
        fontFamily: 'IRANSansWeb',
        fontSize: 16,
        marginLeft: 8,
        textAlign: 'center',
    },
    infoContainer: {

        // alignItems: 'center',
        // marginBottom: 20,
    },
    simpleText: {
        fontFamily: 'IRANSansWeb',
        paddingTop: 20,
        fontSize: 16,
        // textAlign: 'center',
    },
    smallText: {
        fontFamily: 'IRANSansWeb',
        paddingVertical: 5,
        fontSize: 12,
        color: '#757575',
        // textAlign: 'center',
    },
    textIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: 15,
        gap: 5,
    },
    divider: {
        marginVertical: 10,
        color: '#323232'
    },// Adjust as needed backgroundColor: '#000', // Set the color of the divider height: 1, // Set the thickness of the divider },
});

export default Wallet;
