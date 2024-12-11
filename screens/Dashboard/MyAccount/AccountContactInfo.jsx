import React, { useEffect, useLayoutEffect } from 'react';
import { useState, useRef } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Pressable, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import Icon from '../../../components/Icon/Icon';
import axios from 'axios';
import CustomModal from '../../../components/CustomModal/CustomModal';

const ContactInfo = () => {

    const { formData, updateFormData } = useFormData();
    const [isProvinceModalVisible, setIsProvinceModalVisible] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [isCityModalVisible, setIsCityModalVisible] = useState(false);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    useLayoutEffect(() => {
        fetchProvinces()
        console.log('selectedProvince', provinces)
    }, [])
    useLayoutEffect(() => {
        fetchCities()
    }, [selectedProvince])
    const handleChange = (name, value) => {
        updateFormData('contactInfo', { [name]: value });
        console.log(name);

    };
    if (!formData) {
        return <Text>loading ...</Text>
    }

    const toggleProvinceModal = () => {
        fetchProvinces()
        setIsProvinceModalVisible(!isProvinceModalVisible);
    };

    const toggleCityModal = () => {

        setIsCityModalVisible(!isCityModalVisible);
    };

    const toggleMapModal = () => {

        setMapModalVisible(!mapModalVisible);
    }
    const handleSearch = (text) => {
        setSearchQuery(text);
    };


    const fetchProvinces = async () => {
        try {
            const response = await axios.get('http://172.16.100.49:4000/province');
            // console.log('Response from API:', response.data.data); // Log the response data
            setProvinces(response.data.data);

        } catch (error) {
            console.log('Error fetching province data:', error);
            // Handle error (e.g., show an error message)
        }
    }

    const fetchCities = async () => {
        try {
            const response = await axios.post('http://172.16.100.49:4000/city', {
                province_id:
                    selectedProvince[0]

            })
            // console.log('cities: ', response)
            setCities(response.data.data);
        }
        catch (error) {
            console.log('Error fetching city data:', error);
            // Handle error (e.g., show an error message)
        }
    }

    const setProvinceValue = (selectedProvince) => {
        setSelectedProvince(selectedProvince)
        toggleProvinceModal(); // Close the modal after selecting a province

    }



    const setCityValue = (selectedCity) => {

        setSelectedCity(selectedCity)
        toggleCityModal(); // Close the modal after selecting a City
    }


    return (
        <View style={styles.signUpForm}>
            <Text style={styles.inputLabel}>
                شماره همراه
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('mobileNumber', text)}
                placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                keyboardType="numeric"
                value={formData.contactInfo.mobileNumber}
            />
            <Text style={styles.inputLabel}>
                شماره ثابت
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('homeNumber', text)}
                placeholder='66525448'
                keyboardType="numeric"
                value={formData.contactInfo.homeNumber}
            />
            <Text style={styles.inputLabel} >
                ایمیل
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('email', text)}
                placeholder='sa.salehi71@gmail.com'
                value={formData.contactInfo.email}
            />
            <Text style={styles.inputLabel}> استان
            </Text>
            <Pressable style={styles.inputModal} onPress={toggleProvinceModal}>
                <Text style={styles.inputModalText}
                >
                    {selectedProvince[1] || 'استان خود را انتخاب کنید'}
                </Text>
                <Icon name='arrowDown' width={24} height={24} fill="#757575" />
            </Pressable>
            <CustomModal
                isVisible={isProvinceModalVisible}
                onClose={toggleProvinceModal}
            >


                <View>
                    <View style={styles.searchcontainer}>
                        <Icon name="searchNormal" width={24} height={24} fill="#757575" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder=" جستجوی در استان‌ها ..."
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View>
                        <ScrollView style={styles.modalContainer1}>
                            {provinces && provinces.map((province) => (
                                <View key={province.id}>
                                    <Pressable
                                        style={styles.sortingOption}
                                        onPress={() => setProvinceValue([province.id, province.name])}
                                    >
                                        <Text style={styles.provinceName}>{province.name}</Text>
                                    </Pressable>
                                    <View style={styles.line} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </CustomModal>

            <Text style={styles.inputLabel}> شهر
            </Text>
            <Pressable style={styles.inputModal} onPress={toggleCityModal}>
                <Text style={styles.inputModalText}
                >
                    {selectedCity || 'شهر خود را انتخاب کنید'}
                </Text>
                <Icon name='arrowDown' width={24} height={24} fill="#757575" />
            </Pressable>

            <CustomModal isVisible={isCityModalVisible} onClose={toggleCityModal}>
                <View style={styles.searchcontainer}>
                    <Icon name="searchNormal" width={24} height={24} fill="#757575" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder=" جستجوی در شهرها ..."
                        onChangeText={handleSearch}
                    />
                </View>
                <View>
                    <ScrollView style={styles.modalContainer1}>
                        {cities.map((city) => (
                            <View key={city.id}>
                                <Pressable
                                    style={styles.sortingOption}
                                    onPress={() => setCityValue(city.name)}
                                >
                                    <Text style={styles.provinceName}>{city.name}</Text>
                                </Pressable>
                                <View style={styles.line} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </CustomModal>
            <Text style={styles.inputLabel}> کد پستی
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('zipCode', text)}
                value={formData.contactInfo.zipCode}
                keyboardType="numeric"
                placeholder='۱۲۳۴۵۶۷۸۹۰'
            />
            <Text style={styles.inputLabel}> موقعیت مکانی
            </Text>
            <Pressable style={styles.inputModal} onPress={toggleMapModal} >
                <Text style={styles.inputModalText}>
                    123456878
                </Text>
            </Pressable>
            <CustomModal isVisible={mapModalVisible} onClose={toggleMapModal}>

            </CustomModal>

            <Text style={styles.inputLabel}> آدرس
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('address', text)}
                value={formData.contactInfo.address}
                placeholder='تهران - خیابان آزادی - کوچه شهید صادقی - بن بست ششم'
            />
            <Text style={styles.inputLabel}> پلاک
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('pelak', text)}
                value={formData.contactInfo.pelak}
                placeholder='۲'
            />
            <Text style={styles.inputLabel}> واحد
            </Text>
            <View style={styles.container}>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('unit', text)}
                value={formData.contactInfo.unit}
                placeholder='۱'
            />
            <Text style={styles.inputLabel}> توضیحات آدرس
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('description', text)}
                value={formData.contactInfo.description}
                placeholder='توضیحات'
            />
            <Text style={styles.inputLabel}>این آدرس جهت مکاتبات اداری و غیر اداری بین حامی‌کت و شما فروشنده گرامی استفاده خواهد شد، لطفا از صحت اطلاعات وارد شده اطمینان حاصل کنید
            </Text>
        </View >
    );
}
const styles = StyleSheet.create({
    signUpForm: {
        backgroundColor: "#fff",
        padding: 8,
        width: "90%",
        borderRadius: 12,
        marginBottom: 40,
    },
    btnInfo: {
        textAlign: 'center',
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#323232",
    },
    input: {
        textAlign: "right",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        textAlign: "right",
        alignItems: "flex-end",
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
    },
    inputLabel: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
    },
    modal: {
        backgroundColor: "#757575",
        borderRadius: 8,
        borderRadius: 20,
        margin: 10
    },
    inputModal: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        padding: 14,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
    },
    inputModalText: {
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
        color: "#757575",
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '66%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    modalContainer1: {
        padding: 20,
        marginTop: 'auto',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    sortingOption: {
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        padding: 5,
    },
    provinceName: {
        paddingVertical: 10,
        fontFamily: 'IRANSansWeb',
        paddingRight: 10,
    },
    searchcontainer: {
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
        paddingRight: 10,
        marginRight: 10,
        width: "100%",
        textAlign: "right",
    },
})
export default ContactInfo;