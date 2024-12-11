import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Modal, ScrollView, TouchableOpacity } from 'react-native';
// import axios from 'axios';

import { useFormData } from '../../../../services/FormDataContext/FormDataContext';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import Icon from '../../../../components/Icon/Icon';

const Page = ({ shopId, pageNumber, currentPage, nextPage, prevPage, categoryData }) => {
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { shopData } = useFormData();
    const [isOpenMapModal, setIsOpenMapModal] = useState(false);
    const allCaptions = categoryData ? categoryData.map(category => category.caption) : [];
    const [isPartnerShip, setIsPartnerShip] = useState(1);

    if (pageNumber !== currentPage) return null;

    const toggleCategoryModal = () => {
        setIsCategoryModalVisible(!isCategoryModalVisible);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setIsCategoryModalVisible(false);
    };

    const openMapModal = () => {
        setIsOpenMapModal(!isOpenMapModal)
    }
    const handlePartnerShip = (PartnerShip) => {
        let IsPartnerShipValue;
        switch (PartnerShip) {
            case 'عضو هیئت مدیره': PartnerShip
                IsPartnerShipValue = 1;
                break;
            case 'رئيس هیئت مدیره':

                IsPartnerShipValue = 2;
                break;
            case 'مدیر عامل':

                IsPartnerShipValue = 3;
                break;
            default:

                IsPartnerShipValue = 1;
                break;
        }

        setIsPartnerShip(IsPartnerShipValue);

        updateFormData('PartnerShip', { 'PartnerShip': PartnerShip });
        console.log(PartnerShip);
    }
    console.log('shopData: ', shopData)
    return (
        <View>
            {pageNumber === 1 &&
                <View >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name='documentText' width={24} height={24} />
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10
                        }}>
                            اطلاعات فروشگاه
                        </Text>
                    </View>
                    <Text style={styles.inputLabel}>نام فروشگاه </Text>
                    <TextInput
                        style={styles.input}
                        placeholder=''
                        keyboardType="numeric"
                        value={shopData.economic_name}
                    />
                    <Text style={styles.inputLabel}>شماره همراه</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.phone}

                    />
                    <Text style={styles.inputLabel}> دسته بندی </Text>
                    <Pressable style={styles.inputModal} onPress={toggleCategoryModal}>
                        <Text style={styles.inputModalText}>{shopData.category ? shopData.category : selectedCategory}</Text>
                        <Icon name='arrowDown' width={24} height={24} />
                    </Pressable>
                    <Text style={styles.inputLabel}>کد فروشگاه </Text>
                    <Text
                        style={[styles.input, { flexDirection: 'row' }]}

                    >{shopData.id}</Text>
                </View>}
            {
                pageNumber === 2 &&
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name='documentText' width={24} height={24} />
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10
                        }}>
                            اطلاعات تماس و آدرس
                        </Text>
                    </View>
                    <View style={styles.infolable}>
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10,
                        }}>اطلاعات تماس</Text>
                    </View>

                    <Text style={styles.inputLabel}>شماره همراه</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.phone}

                    />
                    <Text style={styles.inputLabel}>شماره ثابت</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.phone}

                    />
                    <Text style={styles.inputLabel}>ایمیل </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.email}

                    />
                    <View style={styles.infolable}>
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10,
                        }}>اطلاعات آدرس</Text>
                    </View>
                    <Text style={styles.inputLabel}> استان
                    </Text>
                    <Pressable style={styles.inputModal} >
                        <Text style={styles.inputModalText}
                        >
                            استان خود را انتخاب کنید
                        </Text>
                        <Icon name='arrowDown' width={24} height={24} fill="red" />
                    </Pressable>

                    <Text style={styles.inputLabel}> شهر
                    </Text>
                    <Pressable style={styles.inputModal} onPress={openMapModal}>
                        <Text style={styles.inputModalText}
                        >
                            شهر خود را انتخاب کنید
                        </Text>
                        <Icon name='arrowDown' width={24} height={24} fill="red" />
                    </Pressable>

                    {/* <CustomModal isVisible={isOpenMapModal} onClose={openMapModal}>
                        <View>
                            <Text>Any content you want inside the modal...</Text>
                        </View>
                    </CustomModal> */}

                    <Text style={styles.inputLabel}>کد پستی </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={shopData.zip_code}
                    />
                    <Text style={styles.inputLabel}>آدرس</Text>
                    <TextInput
                        style={styles.inputBig}
                        // keyboardType="numeric"
                        multiline
                        numberOfLines={4}
                        maxLength={200}
                        value={shopData.addreesfds}
                    />
                    <Text style={styles.inputLabel}>پلاک</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={shopData.pelak}
                    />
                    <Text style={styles.inputLabel}>واحد</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={shopData.vahed}
                    />
                    <Text style={styles.inputLabel}>موقعیت مکانی</Text>
                    <Pressable style={styles.inputModal} onPress={openMapModal}>
                        <Text style={styles.inputModalText}
                        >
                            موقعیت مکانی خود را انتخاب کنید
                        </Text>
                        <Icon name='location' width={24} height={24} fill="red" />
                    </Pressable>

                </View>
            }
            {
                pageNumber === 3 &&
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name='calender' width={24} height={24} />
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10
                        }}>
                            ساعت کاری فروشگاه
                        </Text>
                    </View>

                    <View style={styles.dailyTitle}>
                        <Text style={styles.dailyTimeText}>شروع صبح</Text>
                        <Text style={styles.dailyTimeText}> پایان صبح</Text>
                        <Text style={styles.dailyTimeText}>شروع عصر</Text>
                        <Text style={styles.dailyTimeText}>پایان عصر</Text>
                    </View>
                    <Text>
                        شنبه
                    </Text>
                    <View style={styles.dailyTitle} >
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[0].open_time_1 || '00:00'}

                            </Text>
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[0].close_time_1 || '00:00'}

                            </Text>
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[0].open_time_2 || '00:00'}

                            </Text >
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[0].close_time_2 || '00:00'}

                            </Text>
                        </Pressable>
                    </View>
                    <Text>
                        یکشنبه
                    </Text>
                    <View style={styles.dailyTitle}>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[1].open_time_1 || '00:00'}

                            </Text>
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[1].close_time_1 || '00:00'}

                            </Text>
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <Text style={{ fontSize: 10, paddingRight: 6, }}>
                                {shopData.work_time[1].open_time_2 || '00:00'}

                            </Text >
                        </Pressable>
                        <Pressable style={styles.shopOpenTime}>
                            <Icon name='clock' width={12} height={12} />
                            <TextInput
                                style={{ fontSize: 10, paddingRight: 6, }}
                                placeholder="00:00"
                                value={shopData.work_time[1].close_time_2}
                            />



                        </Pressable>
                    </View>
                </View>
            }

            {
                pageNumber === 4 &&
                <>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 30, }}>
                        <Icon name='documentText' width={24} height={24} />
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10,

                        }}>
                            اطلاعات جواز
                        </Text>
                    </View>
                    <Text style={styles.javazUser}>استفاده کننده از جواز</Text>
                    <View style={styles.inlineToggle}>
                        <Pressable onPress={() => handlePartnerShip('عضو هیئت مدیره')}>
                            <Text style={isPartnerShip == 1 ? styles.sematSelectedRight : styles.sematUnSelectedRight}>عضو هیئت مدیره</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePartnerShip('رئيس هیئت مدیره')}>
                            <Text style={isPartnerShip == 2 ? styles.sematSelectedMiddle : styles.sematUnSelectedMiddle}>رئيس هیئت مدیره</Text>
                        </Pressable>
                        <Pressable onPress={() => handlePartnerShip('مدیر عامل')}>
                            <Text style={isPartnerShip == 3 ? styles.sematSelectedLeft : styles.sematUnSelectedLeft}>مدیر عامل</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.inputLabel}>نام و نام خانوادگی صاحب جواز/پروانه</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        // keyboardType="numeric"
                        value={shopData.license_holder_name}

                    />
                    <Text style={styles.inputLabel}>کد آیسیبک</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.isic_code}

                    />
                    <Text style={styles.inputLabel}>شناسه صنفی (اصلاح شود)</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.isic_code}

                    />
                    <Text style={styles.inputLabel}>کد ملی صاحب جواز</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.caste_id}

                    />
                    <Text style={styles.inputLabel}>شماره همراه صاحب جواز</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                        keyboardType="numeric"
                        value={shopData.license_holder_phone}

                    />
                    <Text style={[styles.inputLabel, { width: 310, fontSize: 12 }]}>کد ملی و شماره همراه صاحب جواز / پروانه می‌بایست با کد ملی و شماره همراه فرشنده یکی باشد</Text>
                </>
            }
            {pageNumber === 5 &&
                <>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 30, }}>
                        <Icon name='documentText' width={24} height={24} />
                        <Text style={{
                            fontFamily: 'IRANSansWeb',
                            paddingRight: 10,

                        }}>
                            مدارک و لوگو فروشگاه
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.uploadBox} >
                        <View style={styles.textInsideTouchableOpacity}>
                            <Text style={{ fontFamily: 'IRANSansWeb' }}>تصویر جلو</Text>
                        </View>
                    </TouchableOpacity>
                </>

            }

            <CustomModal
                // animationType="slide"
                // transparent={true}
                isVisible={isCategoryModalVisible}
                onClose={toggleCategoryModal}
            >



                <ScrollView style={styles.modalContainer}>
                    <Text style={{
                        fontFamily: 'IRANSansWeb',
                        // fontSize: 14,
                        color: '#757575',

                        paddingVertical: 10
                    }}>
                        دسته‌بندی اولیه
                    </Text>
                    <View style={{ borderBottomWidth: 1, borderColor: '#ededed', paddingTop: 10, }}></View>

                    {allCaptions.map((caption, index) => (
                        <Pressable key={index} onPress={() => selectCategory(caption)}>
                            <Text style={styles.categoryList}>{caption}</Text>
                            <View style={{ borderBottomWidth: 1, borderColor: '#ededed' }}></View>
                        </Pressable>

                    ))}
                    <View style={{ paddingVertical: 20, borderColor: '#ededed' }}></View>
                </ScrollView>

            </CustomModal>


        </View >
    );
};

const styles = StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inlineNavigationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    navigationText: {
        color: '#24CAA1',
        fontFamily: 'IRANSansWeb',
        padding: 3
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
    },
    inputBig: {
        textAlign: "right",
        padding: 12,
        maxWidth: 320,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
    },
    inputLabel: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
    },
    infolable: {
        paddingVertical: 16,
        paddingHorizontal: 14,
        backgroundColor: '#ededed',
        width: 124,
        borderRadius: 100,
        marginTop: 18,
    },
    closeIcon: {
        paddingVertical: 10,
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // height: '66%',
        width: '100%',
        // position: 'absolute',
        bottom: 0,
        padding: 25,
    },
    categoryList: {
        fontFamily: 'IRANSansWeb',
        color: '#363636',
        paddingVertical: 20,
        textAlign: 'left',
    },

    dailyTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    dailyTimeText: {
        fontFamily: 'IRANSansWeb',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 100,
        fontSize: 10,
    },
    shopOpenTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#ededed',
        borderWidth: 1,
        padding: 8,
    },
    inlineToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sematSelectedRight: {
        textAlign: 'center',
        paddingVertical: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 104,
        fontSize: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedRight: {
        paddingVertical: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 104,
        fontSize: 12,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    sematSelectedLeft: {
        textAlign: 'center',
        paddingVertical: 16,
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 104,
        fontSize: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedLeft: {
        textAlign: 'center',
        paddingVertical: 16,
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 104,
        fontSize: 12,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    sematSelectedMiddle: {
        textAlign: 'center',
        paddingVertical: 16,
        borderWidth: 0,
        fontSize: 12,
        width: 104,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedMiddle: {
        textAlign: 'center',
        paddingVertical: 16,
        borderWidth: 0,
        fontSize: 12,
        width: 104,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    javazUser: {
        fontFamily: 'IRANSansWeb',
        color: '#757575',
        paddingBottom: 10,
    },
    textInsideTouchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'IRANSansWeb',
    },
});

export default Page;
