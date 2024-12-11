import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import BackButton from '../../../components/BackButton/BackButton';

const InquiryScreen = ({ navigation }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('This is a success message!');
    const [selectedOption, setSelectedOption] = useState('allShop');
    const [inquirys, setinquirys] = useState([
        { id: 1, type: 'در انتظار پاسخ', kala: 'نام کالا + تنوع', kharidar: 'مهدی', date: '1402/07/01', txnNumber: '001' },
        { id: 2, type: 'پاسخ داده شده', kala: '200,000', kharidar: 'میلاد', date: '1402/07/02', txnNumber: '002' },
        { id: 3, type: 'رد شده', kala: '500,000', kharidar: 'میلاد ۲', date: '1402/07/01', txnNumber: '003' },
    ]);

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'در انتظار پاسخ':
                return '#fdf7e2';
            case 'پاسخ داده شده':
                return '#e7f9e7';
            // case 'رد شده':
            case 'رد شده':
                return '#fbe7e9';
            default:
                return '#ededed';
        }
    };
    const getTextColor = (type) => {
        switch (type) {
            case 'در انتظار پاسخ':
                return '#f2bc16';
            case 'پاسخ داده شده':
                return '#2dc58c';
            // case 'رد شده':
            case 'رد شده':
                return '#df3c4e';
            default:
                return '#ededed';
        }
    };

    const sortShopList = (sortingOption) => {
        setSelectedOption(sortingOption);
        // Add sorting logic if needed
    };

    const showAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <BackButton route="HomeScreen" label="استعلام های مشتریان" />
            <View style={styles.formContainer}>
                {/* inquiry List */}
                <View style={styles.inquiryList}>
                    {inquirys.filter(txn => txn.type === selectedOption || selectedOption === 'allShop').map(inquiry => (
                        <View key={inquiry.id} style={styles.inquiryCard}>
                            <View style={styles.row}>
                                <View style={styles.inquiryImage}></View>
                                <View style={[styles.textHeader, { backgroundColor: getBackgroundColor(inquiry.type) }]}>
                                    <Text style={[styles.inquiryText, { color: getTextColor(inquiry.type) }]}>{inquiry.type}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.inquiryText}>{inquiry.kala} تومان</Text>
                                <Text style={styles.inquiryText}>مبلغ: </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.inquiryText}>شماره کارت: </Text>
                                <Text style={[styles.inquiryText, { color: '#2F89F5' }]}>{inquiry.kharidar}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.inquiryText}>تعداد: </Text>
                                <Text style={[styles.inquiryText, { color: '#2F89F5' }]}>{inquiry.kharidar}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.inquiryText}>تاریخ استعلام: </Text>
                                <Text style={styles.inquiryText}>{inquiry.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.inquiryText}>موجودی: </Text>
                                <Text style={styles.inquiryText}>{inquiry.txnNumber}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.inquiryText}> قیمت (تومان): </Text>
                                <Text style={styles.inquiryText}>{inquiry.txnNumber}</Text>
                            </View>
                        </View>
                    ))}
                </View>
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
        paddingVertical: 20,
        marginBottom: 40,
        alignItems: 'center',
    },
    inquiryList: {
        width: '100%',
    },
    textHeader: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 50,
        // margin: 'auto',
        alignItems: 'center',
    },
    inquiryCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        padding: 25,
        marginBottom: 10,
    },
    inquiryImage: {
        height: 80,
        width: 80,
        borderRadius: 10,
        backgroundColor: '#ededed'
        // overflow: 'hidden',
    },
    inquiryText: {
        fontFamily: 'IRANSansWeb',
        fontSize: 14,
        color: '#333',
        paddingVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        alignItems: 'center',
    },
});

export default InquiryScreen;
