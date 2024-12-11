import { Button, Image, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
// import React from 'react'
import ReportScreen from '../Dashboard/ReportScreen'
import Icon from '../../components/Icon/Icon'
import { SafeAreaView } from 'react-native'
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';

const AddShop = ({ navigation }) => {

    const handleAddShop = () => {
        navigation.navigate('AddShopPages')
    }

    return (
        <SafeAreaView style={styles.addNewShopContainer}>
            <Image
                style={styles.bannerImage}
                source={require('../../assets/Image/addshop.png')} />
            <Text style={styles.notAddShop}>هنوز فروشگاهی ایجاد نکردید</Text>
            <CustomTouchableOpacity style={styles.addNewShop} onPress={handleAddShop}>
                <Icon name='add' width={24} height={24} fill='#fff' />
                <Text style={styles.addNewShopText} >
                    ایجاد فروشگاه
                </Text>
            </CustomTouchableOpacity>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    addNewShopContainer: {
        backgroundColor: '#F8F8F8',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewShop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        justifySelf: 'center',
        width: 220,
        height: 48,
        marginVertical: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        fontFamily: 'IRANSansWeb',
        backgroundColor: '#24caa1'

    },
    addNewShopText: {
        color: '#fff',
        fontFamily: 'IRANSansWeb',
        fontSize: 16,
        marginHorizontal: 16,
        textAlign: 'center'
    },
    bannerImage: {
        width: 200,
        height: 200,
    },
    notAddShop: {
        fontFamily: 'IRANSansWeb',
        color: '#757575',
        fontSize: 16,
    },
})


export default AddShop

