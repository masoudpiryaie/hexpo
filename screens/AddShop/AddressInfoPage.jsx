// AddressInfoPage.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from '../../components/Icon/Icon';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';
import CustomModal from '../../components/CustomModal/CustomModal';
import axios from 'axios';
import CustomInput from '../../components/CustomInput/CustomInput';

const AddressInfoPage = ({
    // selectedProvince,
    // selectedCity,
    // provinces,
    // cities,
    toggleProvinceModal,
    toggleCityModal,
    // setProvinceValue,
    // setCityValue,
    provinceModalVisible,
    cityModalVisible,
    nextPage,
    prevPage,
    handleSearch,
}) => {
    const [pageNumber, setPageNumber] = useState(1);
    // const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    // const [provinceModalVisible, setProvinceModalVisible] = useState(false);
    // const [cityModalVisible, setCityModalVisible] = useState(false);
    // const allCaptions = categoryData ? categoryData.data.map(category => category.caption) : [];
    const [categoryData, setCategoryData] = useState();
    const allCaptions = categoryData ? categoryData.map(category => category.caption) : [];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // fetchCategoryData();
        // console.log('allCaptions:  ', allCaptions)
        fetchProvinces();
    }, [])
    useLayoutEffect(() => {
        fetchCities()
    }, [selectedProvince])

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('http://172.16.100.49:4000/province')
            console.log('88888888888888', response.data.data)
            setProvinces(response.data.data)

        } catch (error) {
            console.log('Error fetching province data:', error);
        }
    }

    const setProvinceValue = (province) => {
        setSelectedProvince(province);
        toggleProvinceModal();
    };

    const setCityValue = (city) => {
        setSelectedCity(city);
        toggleCityModal();
    };

    console.log('provinces', provinces)
    const fetchCities = async () => {
        if (!selectedProvince.length) {
            // Don't fetch cities if no province is selected
            return;
        }
        try {
            const response = await axios.post('http://172.16.100.49:4000/city', {
                province_id: selectedProvince[0] // Use selected province id
            });
            console.log('cities: ', response.data.data);
            setCities(response.data.data);
        } catch (error) {
            console.log('Error fetching city data:', error);
        }
    };

    console.log('1111111111111111', provinceModalVisible)
    console.log('2222222222222222', selectedProvince)

    return (
        <ScrollView style={styles.formContainer}>
            <CustomInput
                name="mobileNumber"
                label="شماره همراه"
                placeholder="09393298021"
                keyboardType="numeric"
                required={true}
                value={mobileNumber}
                onChange={(text) => setMobileNumber(text)}
            />

            <CustomInput
                name="tel"
                label="شماره تلفن"
                placeholder="02112345678"
                keyboardType="numeric"
                required={true}
                value={telephoneNumber}
                onChange={(text) => setTelephoneNumber(text)}
            />

            <CustomInput
                label='شماره ثابت'
                placeholder='0218585858'
                keyboardType='numeric'
            // value={yourValue}  // optional
            //  onChange={(text) => setYourValue(text)}  // optional
            />

            <Text style={styles.inputLabel}>استان</Text>
            <CustomTouchableOpacity style={styles.inputModal} onPress={toggleProvinceModal}>
                <Text style={styles.inputModalText}>
                    {selectedProvince[1] || "استان خود را انتخاب کنید"}
                </Text>
                <Icon name='arrowDown' width={24} height={24} fill='#757575' />
            </CustomTouchableOpacity>

            {provinceModalVisible && (
                <CustomModal isVisible={provinceModalVisible} onClose={toggleProvinceModal}>
                    <ScrollView>
                        {provinces.map((province) => (
                            <Pressable key={province.id} onPress={() => setProvinceValue([province.id, province.name])}>
                                <Text style={styles.provinceName}>{province.name}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </CustomModal>
            )}

            <Text style={styles.inputLabel}>شهر</Text>
            <CustomTouchableOpacity
                disabled={!selectedProvince.length} // Disable if no province selected
                style={[
                    styles.inputModal,
                    { opacity: selectedProvince.length ? 1 : 0.5 } // Dim the button when disabled
                ]}
                onPress={toggleCityModal}
            >
                <Text style={styles.inputModalText}>
                    {selectedCity || "شهر خود را انتخاب کنید"}
                </Text>
                <Icon name='arrowDown' width={24} height={24} fill='#757575' />
            </CustomTouchableOpacity>


            {cityModalVisible && selectedProvince && (
                <CustomModal isVisible={cityModalVisible} onClose={toggleCityModal}>
                    <ScrollView>
                        {cities.map((city) => (
                            <Pressable key={city.id} onPress={() => setCityValue(city.name)}>
                                <Text style={styles.provinceName}>{city.name}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </CustomModal>
            )}

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

export default AddressInfoPage;
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