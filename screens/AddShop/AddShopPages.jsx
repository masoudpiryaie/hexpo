// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { View, Text, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Modal, ScrollView, TouchableOpacity } from 'react-native';
// import Icon from '../../components/Icon/Icon';
// import AddShop from './AddShop';
// import CustomModal from '../../components/CustomModal/CustomModal';
// import axios from 'axios';
// import CustomTouchableOpacity from '../../components/CustomTouchableOpacity/CustomTouchableOpacity';
// import CustomInput from '../../components/CustomInput/CustomInput';

// const AddShopPages = ({ navigation }) => {

//     const [pageNumber, setPageNumber] = useState(1);
//     const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
//     const [provinceModalVisible, setProvinceModalVisible] = useState(false);
//     const [cityModalVisible, setCityModalVisible] = useState(false);
//     // const allCaptions = categoryData ? categoryData.data.map(category => category.caption) : [];
//     const [categoryData, setCategoryData] = useState();
//     const allCaptions = categoryData ? categoryData.map(category => category.caption) : [];
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedProvince, setSelectedProvince] = useState([]);
//     const [selectedCity, setSelectedCity] = useState(null);
//     const [provinces, setProvinces] = useState([]);
//     const [cities, setCities] = useState([]);


//     useEffect(() => {
//         fetchCategoryData();
//         console.log('allCaptions:  ', allCaptions)
//         fetchProvinces();
//     }, [])
//     useLayoutEffect(() => {
//         fetchCities()
//     }, [selectedProvince])

//     const selectCategory = (category) => {
//         setSelectedCategory(category);
//         setIsCategoryModalVisible(!isCategoryModalVisible);
//     };

//     const toggleProvinceModal = (provinces) => {
//         setProvinceModalVisible(!provinceModalVisible)

//     }

//     const toggleCityModal = (cities) => {
//         setCityModalVisible(!cityModalVisible)
//     }

//     const nextPage = () => {
//         setPageNumber(pageNumber + 1);
//     };

//     const prevPage = () => {
//         setPageNumber(pageNumber - 1);
//         if (pageNumber <= 1) {

//             setPageNumber(1);
//         }
//     };


//     const toggleCategoryModal = () => {
//         setIsCategoryModalVisible(!isCategoryModalVisible);
//     }

//     const fetchCategoryData = async () => {
//         try {
//             const response = await axios.post('http://172.16.100.49:4000/category/get', {});
//             setCategoryData(response.data.data);
//             console.log('categoryData:  ', categoryData)
//         } catch (error) {
//             console.error('Error fetching category data:', error);
//         }
//     };

//     const fetchProvinces = async () => {
//         try {
//             const responce = await axios.get('http://172.16.100.49:4000/province')
//             setProvinces(responce.data.data)
//         } catch (error) {
//             console.log('Error fetching province data:', error);
//         }
//     }
//     const fetchCities = async () => {
//         try {
//             const response = await axios.post('http://172.16.100.49:4000/city', {
//                 province_id:
//                     selectedProvince[0]

//             })
//             console.log('cities: ', response.data.data)
//             setCities(response.data.data);
//         }
//         catch (error) {
//             console.log('Error fetching city data:', error);
//             // Handle error (e.g., show an error message)
//         }
//     }

//     const setProvinceValue = (selectedProvince) => {
//         setSelectedProvince(selectedProvince)
//         toggleProvinceModal(); // Close the modal after selecting a province
//         console.log('selectedProvince', selectedProvince)
//     }
//     const setCityValue = (selectedCity) => {
//         setSelectedCity(selectedCity)
//         toggleCityModal(); // Close the modal after selecting a province
//         console.log('selectedCity', selectedCity)
//     }

//     const handleSearch = (text) => {
//         setSearchQuery(text);
//     };

//     const onChangeText = (text) => {
//         console.log(text)
//     }
//     console.log(pageNumber)
//     return (
//         <ScrollView style={{ backgroundColor: '#f3f3f3' }} >
//             <CustomTouchableOpacity style={styles.backPressContainer} onPress={prevPage}>
//                 <Icon name='arrowRight' height={24} width={24} fill='#757575' />
//                 <Text style={styles.backPressText}>ایجاد فروشگاه</Text>
//             </CustomTouchableOpacity>
//             {pageNumber === 1 && <>

//                 <ScrollView style={styles.formContainer}>
//                     <View style={styles.headerIconContainer}>
//                         <Icon name='documentText' height={24} width={24} fill='#363636' />
//                         <Text style={styles.headerIconText}>اطلاعات فروشگاه</Text>
//                     </View>
//                     <Text style={styles.inputLabel}>نام فروشگاه </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='فروشگاه ۱'
//                     // keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>دسته‌بندی</Text>
//                     <CustomTouchableOpacity
//                         style={styles.inputModal}
//                         onPress={toggleCategoryModal}
//                         activeOpacity={0.}
//                     >
//                         <Text style={styles.inputModalText}>
//                             {selectedCategory || 'اولیه'}
//                         </Text>
//                         <Icon name='arrowDown' width={24} height={24} fill='#757575' />
//                     </CustomTouchableOpacity>

//                     <Text style={styles.inputLabel}>کد فروشگاه</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='1234'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>درباره فروشگاه</Text>

//                     <TextInput
//                         editable
//                         multiline
//                         numberOfLines={4}
//                         onChangeText={text => onChangeText(text)}
//                         style={styles.input}
//                         rows={2}
//                         placeholder='دربار فروشگاه خود بنویسید' />
//                     <View style={styles.divider}></View>

//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//                         <CustomTouchableOpacity style={styles.nextPageBtn} onPress={nextPage}>
//                             <Icon name='arrowRight' height={24} width={24} fill='#24CAA1' />
//                             <Text style={styles.nextPageText}>بعدی</Text>
//                         </CustomTouchableOpacity>
//                         {pageNumber > 1 &&
//                             <CustomTouchableOpacity style={styles.nextPageBtn} onPress={prevPage}>
//                                 <Text style={styles.nextPageText}>قبلی</Text>
//                                 <Icon name='arrowLeft' height={24} width={24} fill='#24CAA1' />
//                             </CustomTouchableOpacity>}
//                     </View>
//                 </ScrollView>
//                 {isCategoryModalVisible &&
//                     <CustomModal
//                         isVisible={isCategoryModalVisible}
//                         onClose={toggleCategoryModal}
//                     >
//                         <ScrollView style={styles.modalContainer}>
//                             <Text style={{
//                                 fontFamily: 'IRANSansWeb',
//                                 fontSize: 14,
//                                 color: '#757575',

//                                 paddingVertical: 10
//                             }}>
//                                 دسته‌بندی اولیه
//                             </Text>
//                             <View style={{ borderBottomWidth: 1, borderColor: '#ededed', paddingTop: 10, }}></View>

//                             {allCaptions.map((caption, index) => (
//                                 <CustomTouchableOpacity key={index} onPress={() => selectCategory(caption)}>
//                                     <Text style={styles.categoryList}>{caption}</Text>
//                                     <View style={{ borderBottomWidth: 1, borderColor: '#ededed' }}></View>
//                                 </CustomTouchableOpacity>

//                             ))}
//                             <View style={{ paddingVertical: 20, borderColor: '#ededed' }}></View>
//                         </ScrollView>

//                     </CustomModal>
//                 }



//             </>}
//             {pageNumber === 2 && <>

//                 <ScrollView style={styles.formContainer}>
//                     <View style={styles.headerIconContainer}>
//                         <Icon name='documentText' height={24} width={24} fill='#363636' />
//                         <Text style={styles.headerIconText}>اطلاعات آدرس و تماس</Text>
//                     </View>
//                     <Text style={styles.infoBoxText}>اطلاعات تماس</Text>
//                     <Text style={styles.inputLabel}>شماره همراه</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='09123456789'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>شماره ثابت</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='665252256'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>شماره همراه دوم</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='09123456789'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>ایمیل</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='sa.saaa@gmail.com'
//                     // keyboardType="numeric"
//                     />


//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <CustomTouchableOpacity style={styles.nextPageBtn} onPress={nextPage}>
//                             <Icon name='arrowRight' height={24} width={24} fill='#24CAA1' />
//                             <Text style={styles.nextPageText}>بعدی</Text>
//                         </CustomTouchableOpacity>
//                         {pageNumber > 1 &&
//                             <CustomTouchableOpacity style={styles.nextPageBtn} onPress={prevPage}>
//                                 <Text style={styles.nextPageText}>قبلی</Text>
//                                 <Icon name='arrowLeft' height={24} width={24} fill='#24CAA1' />
//                             </CustomTouchableOpacity>}

//                     </View>
//                 </ScrollView>
//             </>}
//             {pageNumber === 3 && <>

//                 <ScrollView style={styles.formContainer}>

//                     <Text style={styles.infoBoxText}>اطلاعات آدرس</Text>
//                     <Text style={styles.inputLabel}>استان</Text>
//                     <CustomTouchableOpacity
//                         style={styles.inputModal}
//                         onPress={toggleProvinceModal}
//                         activeOpacity={0.}
//                     >
//                         <Text style={styles.inputModalText}>{selectedProvince[1] || "استان خود را انتخاب کنید"}</Text>
//                         <Icon name='arrowDown' width={24} height={24} fill='#757575' />
//                     </CustomTouchableOpacity>
//                     {provinceModalVisible &&
//                         <CustomModal
//                             isVisible={provinceModalVisible}
//                             onClose={toggleProvinceModal}

//                         >
//                             <View>
//                                 <View style={styles.searchContainer}>
//                                     <Icon name='searchNormal' width={24} height={24} fill='#757575' />
//                                     <TextInput
//                                         style={styles.searchInput}
//                                         placeholder=" جستجوی در استان‌ها ..."
//                                         onChangeText={handleSearch}
//                                     />
//                                 </View>
//                                 <View>
//                                     <ScrollView style={styles.modalContainer}>
//                                         {provinces && provinces.map((province) => (
//                                             <View key={province.id}>
//                                                 <Pressable
//                                                     style={styles.sortingOption}
//                                                     onPress={() => setProvinceValue([province.id, province.name])}
//                                                 >
//                                                     <Text style={styles.provinceName}>{province.name}</Text>
//                                                 </Pressable>
//                                                 <View style={styles.line} />
//                                             </View>
//                                         ))}
//                                     </ScrollView>
//                                 </View>
//                             </View>
//                         </CustomModal>
//                     }

//                     <Text style={styles.inputLabel}>شهر</Text>
//                     <CustomTouchableOpacity
//                         style={styles.inputModal}
//                         onPress={toggleCityModal}
//                         activeOpacity={0.}
//                     >
//                         <Text style={styles.inputModalText}>
//                             {selectedCity || 'شهر خود را انتخاب کنید'}
//                         </Text>
//                         <Icon name='arrowDown' width={24} height={24} fill='#757575' />
//                     </CustomTouchableOpacity>
//                     {cityModalVisible &&
//                         <CustomModal
//                             isVisible={cityModalVisible}
//                             onClose={toggleCityModal}

//                         >
//                             <View>
//                                 <View style={styles.searchContainer}>
//                                     <Icon name='searchNormal' width={24} height={24} fill='#757575' />
//                                     <TextInput
//                                         style={styles.searchInput}
//                                         placeholder=" جستجوی در شهر‌ها ..."
//                                         onChangeText={handleSearch}
//                                     />
//                                 </View>
//                                 <View>
//                                     <ScrollView style={styles.modalContainer}>
//                                         {cities && cities.map((city) => (
//                                             <View key={city.id}>
//                                                 <Pressable
//                                                     style={styles.sortingOption}
//                                                     onPress={() => setCityValue(city.name)}
//                                                 >
//                                                     <Text style={styles.provinceName}>{city.name}</Text>
//                                                 </Pressable>
//                                                 <View style={styles.line} />
//                                             </View>
//                                         ))}
//                                     </ScrollView>
//                                 </View>
//                             </View>
//                         </CustomModal>
//                     }

//                     <Text style={styles.inputLabel}>کد پستی</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='1234567890'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>آدرس</Text>
//                     <TextInput
//                         editable
//                         multiline
//                         numberOfLines={4}
//                         onChangeText={text => onChangeText(text)}
//                         style={styles.input}
//                         rows={2}
//                         placeholder='مثال: تهران- خیابان بهشتی- کوچه امیی' />
//                     <Text style={styles.inputLabel}>پلاک</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='2'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>واحد</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder='2'
//                         keyboardType="numeric"
//                     />
//                     <Text style={styles.inputLabel}>موقعیت مکانی</Text>
//                     <CustomTouchableOpacity
//                         style={styles.inputModal}
//                         onPress={toggleCityModal}
//                         activeOpacity={0.}
//                     >
//                         <Text style={styles.inputModalText}>
//                             34.232523
//                         </Text>
//                         <Icon name='location' width={24} height={24} fill='#757575' />
//                     </CustomTouchableOpacity>
//                     <Text style={styles.inputLabel}>توضیحات آدرس</Text>
//                     <TextInput
//                         editable
//                         multiline
//                         numberOfLines={4}
//                         onChangeText={text => onChangeText(text)}
//                         style={styles.input}
//                         rows={2}
//                         placeholder='مثال: تهران- خیابان بهشتی- کوچه امیی' />
//                     <View style={styles.divider}></View>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <Pressable style={styles.nextPageBtn} onPress={nextPage}>
//                             <Icon name='arrowRight' height={24} width={24} fill='#24CAA1' />
//                             <Text style={styles.nextPageText}>بعدی</Text>
//                         </Pressable>
//                         {pageNumber > 1 &&
//                             <Pressable style={styles.nextPageBtn} onPress={prevPage}>
//                                 <Text style={styles.nextPageText}>قبلی</Text>
//                                 <Icon name='arrowLeft' height={24} width={24} fill='#24CAA1' />
//                             </Pressable>}

//                     </View>
//                 </ScrollView>
//             </>}



//         </ScrollView >
//     )
// }

// export default AddShopPages

import React, { useState, useEffect, useLayoutEffect } from 'react';
import ShopInfoPage from './ShopInfoPage';
import ContactInfoPage from './ContactInfoPage';
import AddressInfoPage from './AddressInfoPage';
import axios from 'axios';
import { StyleSheet } from 'react-native';

const AddShopPages = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [provinceModalVisible, setProvinceModalVisible] = useState(false);
    const [cityModalVisible, setCityModalVisible] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const allCaptions = categoryData.map(category => category.caption);

    useEffect(() => {
        fetchCategoryData();
        fetchProvinces();
    }, []);

    useLayoutEffect(() => {
        fetchCities();
    }, [selectedProvince]);

    const nextPage = () => setPageNumber((prev) => prev + 1);
    const prevPage = () => setPageNumber((prev) => prev - 1);

    const toggleCategoryModal = () => setIsCategoryModalVisible(!isCategoryModalVisible);
    const selectCategory = (category) => {
        setSelectedCategory(category);
        toggleCategoryModal();
    };

    // const setProvinceValue = (province) => {
    //     setSelectedProvince(province);
    //     toggleProvinceModal();
    // };

    // const setCityValue = (city) => {
    // setSelectedCity(city);
    // toggleCityModal();


    const toggleProvinceModal = () => setProvinceModalVisible(!provinceModalVisible);
    const toggleCityModal = () => setCityModalVisible(!cityModalVisible);

    const fetchCategoryData = async () => {
        const response = await axios.get('http://172.16.100.49:4000/categories');
        setCategoryData(response.data);
    };

    const fetchProvinces = async () => {
        const response = await axios.get('http://172.16.100.49:4000/provinces');
        setProvinces(response.data);
    };

    const fetchCities = async () => {
        const response = await axios.get(`http://172.16.100.49:4000/cities?provinceId=${selectedProvince[0]}`);
        setCities(response.data);
    };
    // console.log('provinceModalVisible', provinceModalVisible)


    return (
        <>
            {pageNumber === 1 && (
                <ShopInfoPage
                    nextPage={nextPage}
                    toggleCategoryModal={toggleCategoryModal}
                    allCaptions={allCaptions}
                    selectCategory={selectCategory}
                    selectedCategory={selectedCategory}
                    isCategoryModalVisible={isCategoryModalVisible}
                />
            )}
            {pageNumber === 2 && <ContactInfoPage nextPage={nextPage} prevPage={prevPage} />}
            {pageNumber === 3 && (
                <AddressInfoPage
                    nextPage={nextPage}
                    prevPage={prevPage}
                    selectedProvince={selectedProvince}
                    selectedCity={selectedCity}
                    provinces={provinces}
                    cities={cities}
                    toggleProvinceModal={toggleProvinceModal}
                    toggleCityModal={toggleCityModal}
                    // setProvinceValue={setProvinceValue}
                    // setCityValue={setCityValue}
                    provinceModalVisible={provinceModalVisible}
                    cityModalVisible={cityModalVisible}

                />
            )}
        </>
    );
};

export default AddShopPages;

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
