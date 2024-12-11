
import React from 'react';
import { useState, useRef, useEffect } from 'react'
import { View, TextInput, Button, Pressable, StyleSheet, ScrollView, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import Icon from '../../../components/Icon/Icon';
import { validateIDNumber, validatePassword, validateAgentIDNumber, validateReTypePassword, validateName } from '../../../services/Validation/FormValidation'


//  ex const  passwordtopass = formData.personalInfo.password
const PersonalInfo = () => {
    const { formData, updateFormData } = useFormData();
    const [isSelected, setIsSelected] = useState(true);
    const { ispersonal, setIspersonal } = useFormData();
    const [isPartnerShip, setIsPartnerShip] = useState(1);
    const [showField, setShowfield] = useState(false);
    const [focusedInput, setFocusedInput] = useState('');
    const [errors, setErrors] = useState([]);
    const debounceTimeout = useRef(null);


    const handleGenderPress = (gender) => {
        setIsSelected(gender === 'مرد' ? true : false);

        updateFormData('personalInfo', { 'gender': gender });
        console.log('gender: ', gender)
    };
    const handleLegal = (legal) => {
        setIspersonal(legal === 'حقیقی' ? 1 : 2);

        updateFormData('legal', { 'lagal': ispersonal });
        console.log('legal: ', legal)
    }

    const handleChange = (name, value) => {
        updateFormData('personalInfo', { [name]: value });
        clearTimeout(debounceTimeout.current); // Clear previous timeout
        // Set new timeout to perform validation after 2 seconds of inactivity
        debounceTimeout.current = setTimeout(() => {

            let newErrors = [...errors];
            switch (name) {
                case 'name':
                    if (value && validateIDNumber(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validateName(value) }];
                    }
                    break;
                case 'idNumber':
                    if (value && validateIDNumber(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: 'کد ملی را به درستی وارد کنید' }];
                    }
                    break;
                case 'password':
                    console.log('value: ', value)
                    if (value && !validatePassword(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
                    }
                    break;
                case 'reTypePassword':
                    if (value && !validateReTypePassword(value, formData.personalInfo.password)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validateReTypePassword(value, formData.personalInfo.password) }];
                    }
                    break;
                case 'agentIdNumber':
                    if (value && !validatePassword(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
                    }
                    break;
                case 'agentIdNumber':
                    if (value && !validatePassword(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
                    }
                    break;
                default:
                    newErrors = newErrors.filter((error) => error.name !== name);
                    break;
            }
            setErrors(newErrors);
        }, 500);
    };
    console.log('error:', errors);///////////////////////
    useEffect(() => {
        console.log('ispersonal: ', ispersonal)

        updateFormData('userType', { 'userType': ispersonal });
    }, [ispersonal])


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

    const addField = () => {
        setShowfield(!showField)
    }


    const renderInputField = (label, name, placeholder, keyboardType = 'default', value = formData.personalInfo[name]) => (
        <View>
            <Text style={styles.inputLable}>{label}</Text>
            <TextInput
                style={[styles.input, focusedInput === name ? styles.inputFocused : null]}
                onChangeText={(text) => handleChange(name, text)}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                onFocus={() => setFocusedInput(name)}
            />
            {errors.map((error, index) => (
                error.name === name ?
                    <View key={index} style={{ flexDirection: 'row', paddingTop: 8 }}>
                        <Icon name='error' width={14} height={14} fill="red" />
                        <Text style={styles.errorText}>{error.message}</Text>
                    </View> : null
            ))}
        </View>
    );


    if (!formData) {
        return <Text>loading ...</Text>
    } return (
        <View style={styles.container}>
            <View style={styles.signUpForm}>
                <Text style={styles.btnInfo}>
                    اطلاعات شخصی
                </Text>
                <Text style={styles.inputLable}>
                    نوع فروشنده
                </Text>
                <View style={styles.inlineToggle}>
                    <Pressable onPress={() => handleLegal('حقیقی')}
                    >
                        <Text style={ispersonal === 1 ? styles.toggleRightEnable : styles.toggleRightDisable}>
                            حقیقی
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => handleLegal('حقوقی')}
                    >
                        <Text style={ispersonal === 1 ? styles.toggleLeftDisable : styles.toggleLeftEnable}>
                            حقوقی
                        </Text>
                    </Pressable>
                </View>

                {ispersonal === 1 ? (
                    <>
                        {renderInputField('نام', 'name', 'امین')}
                        {renderInputField('نام خانوادگی', 'familyName', 'صالحی')}
                        {renderInputField('کد ملی', 'idNumber', '1234567890', 'numeric')}

                        {renderInputField('تاریخ تولد', 'birthday', '۱۳۷۱/۰۷/۱۵')}
                        {renderInputField('رمز عبور', 'password', 'Aa12345678')}

                        <Text style={styles.passwordConditionText}>رمز باید حداقل ۸ کاراکتر و شامل حروف انگلیسی کوچک و بزرگ باشد</Text>
                        {renderInputField('تکرار رمز عبور', 'reTypePassword', 'Aa12345678')}

                        <Text style={styles.inputLable}>جنسیت</Text>
                        <View style={styles.inlineToggle}>
                            <Pressable onPress={() => handleGenderPress('مرد')}>
                                <Text style={isSelected ? styles.genderSelectedRight : styles.genderUnSelectedRight}>مرد</Text>
                            </Pressable>
                            <Pressable onPress={() => handleGenderPress('زن')}>
                                <Text style={!isSelected ? styles.genderSelectedLeft : styles.genderUnSelectedLeft}>زن</Text>
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <>
                        {renderInputField('نام نماینده', 'agentName', 'امین')}
                        {renderInputField('نام خانوادگی نماینده', 'agentFamilyName', 'صالحی')}
                        {renderInputField('کد ملی نماینده', 'agentIdNumber', '1234567890', 'numeric')}
                        {renderInputField('تاریخ تولد نماینده', 'agentBirthday', '۱۳۷۱/۰۷/۱۵')}
                        {renderInputField('رمز عبور', 'password', 'Aa12345678')}

                        <Text style={styles.passwordConditionText}>رمز باید حداقل ۸ کاراکتر و شامل حروف انگلیسی کوچک و بزرگ باشد</Text>
                        {renderInputField('تکرار رمز عبور', 'reTypePassword', 'Aa12345678')}
                        <Text style={styles.inputLable}>جنسیت
                        </Text>
                        <View style={styles.inlineToggle}>
                            <Pressable onPress={() => handleGenderPress('مرد')}>
                                <Text style={isSelected ? styles.genderSelectedRight : styles.genderUnSelectedRight}>مرد</Text>
                            </Pressable>
                            <Pressable onPress={() => handleGenderPress('زن')}>
                                <Text style={!isSelected ? styles.genderSelectedLeft : styles.genderUnSelectedLeft}>زن</Text>
                            </Pressable>
                        </View>
                        {renderInputField('نام شرکت / موسسه', 'companyName', 'کاوشگران نقطه تعادل بازار')}
                        {renderInputField('شناسه ملی', 'companyId', '1212121')}
                        {renderInputField('نوع شخص حقوقی', 'legalType', 'امین')}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                            <Icon name='path' width={24} height={24} />
                            <Text style={{ fontSize: 14, fontWeight: 500, color: '#323232', fontFamily: 'IRANSansWeb', paddingRight: 5, fontWeight: 500 }}>صاحبان امضا</Text>
                        </View>
                        {renderInputField('نام و نام خانوادگی', 'nameFamily', '', 'default', '')}
                        {renderInputField('کد ملی صاحب', 'idNumber', '0012345678', 'numeric', '')}

                        {renderInputField('شماره همراه صاحب امضا', 'legalphoneNumber', '', 'numeric', '')}
                        <Text style={styles.inputLable}>سمت صاحب امضا
                        </Text>
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

                        <Pressable style={[styles.addPartnership, !showField && styles.addPartnershipExpanded]} onPress={addField}>
                            <Svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={showField ? styles.rotatedSvg : null}>
                                <Path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                            <Text style={styles.addPartnershipText}>{showField ? 'حذف صاحب امضا' : 'ایجاد صاحب امضا'}</Text>
                        </Pressable>
                        {showField && renderInputField('', 'partnershipField', 'کارمند')}
                    </>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    signUpForm: {
        backgroundColor: "#fff",
        padding: 24,
        width: 328,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 40,
    },
    inline: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 60,
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
    toggleRightEnable: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',

    },
    toggleRightDisable: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',

    },
    toggleLeftEnable: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',

    },
    toggleLeftDisable: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',

    },
    container: {
        alignItems: "center",
        justifyContent: "center",
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
    inputLable: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',


    },
    errorText: {
        color: 'red',
        paddingRight: 4,
        alignItems: "center",
        fontFamily: 'IRANSansWeb',
        fontSize: 10
    },
    passwordConditionText: {
        fontSize: 10,
        color: "#757575",
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 24,
        fontFamily: 'IRANSansWeb',

    },
    togglegGendermale: {
        justifyContent: "right",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 8,
        width: 140,
        padding: 12,
        marginTop: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
    },
    inlineToggle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 14,

    },
    genderSelectedRight: {
        textAlign: 'center',
        borderWidth: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    genderUnSelectedRight: {
        textAlign: 'center',
        borderWidth: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    genderSelectedLeft: {
        textAlign: 'center',
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    genderUnSelectedLeft: {
        textAlign: 'center',
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 140,
        padding: 14,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    sematSelectedRight: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 93,
        fontSize: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedRight: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: 93,
        fontSize: 12,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    sematSelectedLeft: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 93,
        fontSize: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedLeft: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderWidth: 0,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: 93,
        fontSize: 12,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    sematSelectedMiddle: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderWidth: 0,
        width: 93,
        fontSize: 12,
        backgroundColor: "#e2faf4",
        color: "#24caa1",
        fontFamily: 'IRANSansWeb',
    },
    sematUnSelectedMiddle: {
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderWidth: 0,
        width: 93,
        fontSize: 12,
        backgroundColor: "#ededed",
        color: "#cbcbcb",
        fontFamily: 'IRANSansWeb',
    },
    addPartnership: {

        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        width: 156,
        borderRadius: 8,
        fontFamily: 'IRANSansWeb',
    },

    rotatedSvg: {
        transform: [{ rotate: '45deg' }],

    },
    addPartnershipText: {
        fontFamily: 'IRANSansWeb',
    },
    inputFocused: {
        borderColor: '#24caa1', // Change border color when focused
    },


})
export default PersonalInfo;


