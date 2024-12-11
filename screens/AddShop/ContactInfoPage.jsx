// ContactInfoPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import Icon from '../../components/Icon/Icon';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';

const ContactInfoPage = ({ nextPage, prevPage }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [provinceModalVisible, setProvinceModalVisible] = useState(false);
    const [cityModalVisible, setCityModalVisible] = useState(false);
    // const allCaptions = categoryData ? categoryData.data.map(category => category.caption) : [];
    const [categoryData, setCategoryData] = useState();
    const allCaptions = categoryData ? categoryData.map(category => category.caption) : [];
    const [selectedCategory, setSelectedCategory] = useState(null);
    // const [allCaptions, setallCaptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.headerIconContainer}>
                <Icon name='documentText' height={24} width={24} fill='#363636' />
                <Text style={styles.headerIconText}>اطلاعات آدرس و تماس</Text>
            </View>
            <Text style={styles.inputLabel}>شماره همراه</Text>
            <TextInput style={styles.input} placeholder='09123456789' keyboardType="numeric" />
            <Text style={styles.inputLabel}>شماره ثابت</Text>
            <TextInput style={styles.input} placeholder='665252256' keyboardType="numeric" />
            <Text style={styles.inputLabel}>شماره همراه دوم</Text>
            <TextInput style={styles.input} placeholder='09123456789' keyboardType="numeric" />
            <Text style={styles.inputLabel}>ایمیل</Text>
            <TextInput style={styles.input} placeholder='sa.saaa@gmail.com' />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomTouchableOpacity style={styles.nextPageBtn} onPress={nextPage}>
                    <Icon name='arrowRight' height={24} width={24} fill='#24CAA1' />
                    <Text style={styles.nextPageText}>بعدی</Text>
                </CustomTouchableOpacity>

                <CustomTouchableOpacity style={styles.nextPageBtn} onPress={prevPage}>
                    <Text style={styles.nextPageText}>قبلی</Text>
                    <Icon name='arrowLeft' height={24} width={24} fill='#24CAA1' />
                </CustomTouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ContactInfoPage;
const styles = StyleSheet.create({
    backPressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backPressText: {
        fontFamily: 'IRANSansWeb',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginHorizontal: 24,
        marginBottom: 40,
    },
    headerIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    headerIconText: {
        fontFamily: 'IRANSansWeb',
        // fontSize: 16,
        paddingHorizontal: 8,

    },
    inputLabel: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
    },
    input: {
        textAlign: "right",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        alignItems: "flex-end",
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
        alignContent: 'flex-start',
    },
    inputModalText: {
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
        color: "#757575",
    },
    inputModal: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderRadius: 8,
        alignItems: 'center',
        padding: 14,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
    },
    divider: {
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        marginVertical: 24,
    },
    nextPageBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    nextPageText: {
        color: '#24CAA1',
        paddingHorizontal: 8,
        fontFamily: 'IRANSansWeb',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 55,
    },
    categoryList: {
        fontFamily: 'IRANSansWeb',
        color: '#363636',
        paddingVertical: 18,
        textAlign: 'left',
    },
    infoBoxText: {
        alignSelf: 'flex-start',
        fontFamily: 'IRANSansWeb',
        backgroundColor: '#ededed',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginTop: 16,
    },
    sortingOption: {
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 12,
        marginHorizontal: 20,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    searchInput: {
        fontFamily: 'IRANSansWeb',
        // paddingRight: 10,
        // marginRight: 20,
        width: "100%",
        textAlign: "right",
    },
    provinceName: {
        paddingVertical: 10,
        fontFamily: 'IRANSansWeb',
        paddingRight: 10,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        padding: 5,
    },
})