import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import Icon from '../../../components/Icon/Icon';
import CustomText from '../../../components/CustomText/CustomText'
import * as Font from "expo-font";
const DisplayFormData = ({ formData }) => {
    const { ispersonal, setIspersonal } = useFormData();
    console.log(ispersonal)
    // console.log(formData);
    return (
        <View style={styles.container}>
            <View style={styles.signUpForm}>
                {ispersonal === 2 ? <View>
                    <Text style={styles.infoHeaderText} >اطلاعات شخصی</Text>

                    <Text style={styles.infoText}>نوع فروشنده: {formData.userType.userTypeName}</Text>
                    <Text style={styles.infoText}>نام نماینده: {formData.personalInfo.agentName}</Text>
                    <Text style={styles.infoText}>نام خانوادگی نماینده: {formData.personalInfo.agentFamilyName}</Text>
                    <Text style={styles.infoText} >کد ملی نماینده: {formData.personalInfo.agentIdNumber}</Text>
                    <Text style={styles.infoText}>تاریخ تولد نماینده: {formData.personalInfo.agentBirthday}</Text>
                    <Text style={styles.infoText}>رمز عبور: {formData.personalInfo.password}</Text>
                    <Text style={styles.infoText}>جنسیت: {formData.personalInfo.gender}</Text>
                    <Text style={styles.infoText}>نام شرکت / موسسه: {formData.personalInfo.companyName}</Text>
                    <Text style={styles.infoText}>شناسه ملی: {formData.personalInfo.companyId}</Text>
                    <Text style={styles.infoText}>نوع شخص حقوقی: {formData.personalInfo.legalType}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                        <Icon name='path' width={24} height={24} />
                        <Text style={{ fontSize: 14, fontWeight: 500, color: '#323232', fontFamily: 'IRANSansWeb', paddingRight: 5, fontWeight: 500 }}>صاحبان امضا</Text>
                    </View>
                    <Text style={styles.infoText}>نام و نام خانوادگی: {formData.personalInfo.nameFamily}</Text>
                    <Text style={styles.infoText}>کد ملی صاحب: {formData.personalInfo.idNumber}</Text>
                    <Text style={styles.infoText}>سمت صاحب امضا: {formData.personalInfo.legalType}</Text>
                    <Text style={[styles.infoHeaderText, { marginTop: 24 }]}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>جنسیت: {formData.personalInfo.nameFamily}</Text>
                    <Text style={styles.infoText}>جنسیت: {formData.personalInfo.idNumber}</Text>

                    <Text style={[styles.infoHeaderText, { marginTop: 24 }]}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>شماره همراه: {formData.contactInfo.mobileNumber}</Text>
                    <Text style={styles.infoText}>شماره ثابت: {formData.contactInfo.homeNumber}</Text>
                    <Text style={styles.infoText}>ایمیل: {formData.contactInfo.email}</Text>
                    <Text style={styles.infoText}>استان: {formData.contactInfo.province}</Text>
                    <Text style={styles.infoText}>شهر: {formData.contactInfo.city}</Text>
                    <Text style={styles.infoText}>کد پستی: {formData.contactInfo.zipCode}</Text>
                    <Text style={styles.infoText}>موقعیت مکانی: {formData.contactInfo.location}</Text>
                    <Text style={styles.infoText}>آدرس: {formData.contactInfo.Address}</Text>
                    <Text style={styles.infoText}>پلاک: {formData.contactInfo.pelak}</Text>
                    <Text style={styles.infoText}>واحد: {formData.contactInfo.unit}</Text>
                    <Text style={[styles.infoHeaderText, { marginTop: 24 }]}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>شماره شبا: {formData.bankAccountInfo.shabaNumber}</Text>
                    <Text style={styles.infoText}>شماره کارت: {formData.bankAccountInfo.cardNumber}</Text>
                    <Text style={styles.infoText}>شماره حساب: {formData.bankAccountInfo.bankAccountNumber}</Text>
                </View> : (<View>
                    <Text style={styles.infoHeaderText}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>نوع فروشنده: {formData.userType.userTypeName}</Text>
                    <Text style={styles.infoText}>نام: {formData.personalInfo.name}</Text>
                    <Text style={styles.infoText}>نام خانوادگی: {formData.personalInfo.familyName}</Text>
                    <Text style={styles.infoText}>کد ملی: {formData.personalInfo.idNumber}</Text>
                    <Text style={styles.infoText}>تاریخ تولد: {formData.personalInfo.birthday}</Text>
                    <Text style={styles.infoText}>رمز عبور: {formData.personalInfo.password}</Text>
                    <Text style={styles.infoText}>جنسیت: {formData.personalInfo.gender}</Text>
                    <Text style={[styles.infoHeaderText, { marginTop: 24 }]}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>شماره همراه: {formData.contactInfo.mobileNumber}</Text>
                    <Text style={styles.infoText}>شماره ثابت: {formData.contactInfo.homeNumber}</Text>
                    <Text style={styles.infoText}>ایمیل: {formData.contactInfo.email}</Text>
                    <Text style={styles.infoText}>استان: {formData.contactInfo.province}</Text>
                    <Text style={styles.infoText}>شهر: {formData.contactInfo.city}</Text>
                    <Text style={styles.infoText}>کد پستی: {formData.contactInfo.zipCode}</Text>
                    <Text style={styles.infoText}>موقعیت مکانی: {formData.contactInfo.location}</Text>
                    <Text style={styles.infoText}>آدرس: {formData.contactInfo.Address}</Text>
                    <Text style={styles.infoText}>پلاک: {formData.contactInfo.pelak}</Text>
                    <Text style={styles.infoText}>واحد: {formData.contactInfo.unit}</Text>
                    <Text style={[styles.infoHeaderText, { marginTop: 24 }]}>اطلاعات شخصی</Text>
                    <Text style={styles.infoText}>شماره شبا: {formData.bankAccountInfo.shabaNumber}</Text>
                    <Text style={styles.infoText}>شماره کارت: {formData.bankAccountInfo.cardNumber}</Text>
                    <Text style={styles.infoText}>شماره حساب: {formData.bankAccountInfo.bankAccountNumber}</Text>
                </View>)

                }


            </View>
        </View >



    );
};

const styles = StyleSheet.create({
    infoHeaderText: {
        backgroundColor: '#EDEDED',
        paddingTop: 14,
        paddingRight: 16,
        paddingBottom: 14,
        paddingLeft: 16,
        borderRadius: 50,
        width: 125,
        fontFamily: 'IRANSansWeb',
    },
    signUpForm: {
        backgroundColor: "#fff",
        padding: 24,
        width: 328,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 40,
    },
    infoText: {
        paddingTop: 24,
        color: '#757575',
        fontFamily: 'IRANSansWeb',
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    signUpForm: {
        backgroundColor: "#fff",
        padding: 24,
        width: 328,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 40,
    },

    uploadBox: {
        width: 280,
        borderColor: '#CBCBCB',
        borderWidth: 1,
        height: 112,
        borderRadius: 8,
        marginTop: 16,
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
    textInsideTouchableOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'IRANSansWeb',
    },
})
export default DisplayFormData;