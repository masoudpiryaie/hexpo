
// import React from 'react';
// import { useState, useRef, useEffect } from 'react'
// import { View, TextInput, Button, Pressable, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import { useFormData } from '../../../services/FormDataContext/FormDataContext';
// import Icon from '../../../components/Icon/Icon';
// import { validateIDNumber, validatePassword, validateAgentIDNumber, validateReTypePassword, validateName } from '../../../services/Validation/FormValidation'
// import IdCardInfo from '../../SignUp/IdCardUpload/IdCardUpload';
// import CustomTouchableOpacity from '../../../components/CustomTouchableOpacity/CustomTouchableOpacity';


// //  ex const  passwordtopass = formData.personalInfo.password
// const AccountPersonalInfo = () => {
//     const { formData, updateFormData } = useFormData();
//     const [isSelected, setIsSelected] = useState(true);
//     const { ispersonal, setIspersonal } = useFormData();
//     const [isPartnerShip, setIsPartnerShip] = useState(1);
//     const [showField, setShowfield] = useState(false);
//     const [focusedInput, setFocusedInput] = useState('');
//     const [errors, setErrors] = useState([]);
//     const debounceTimeout = useRef(null);
//     const [frontPhoto, setFrontPhoto] = useState(null);
//     const [backPhoto, setBackPhoto] = useState(null);


//     useEffect(() => {
//         requestPermissions();
//     }, []);

//     const handleGenderPress = (gender) => {
//         setIsSelected(gender === 'مرد' ? true : false);

//         updateFormData('personalInfo', { 'gender': gender });
//         console.log('gender: ', gender)
//     };
//     const handleLegal = (legal) => {
//         setIspersonal(legal === 'حقیقی' ? 1 : 2);

//         updateFormData('legal', { 'lagal': ispersonal });
//         console.log('legal: ', legal)
//     }

//     const handleChange = (name, value) => {
//         updateFormData('personalInfo', { [name]: value });
//         clearTimeout(debounceTimeout.current); // Clear previous timeout
//         // Set new timeout to perform validation after 2 seconds of inactivity
//         debounceTimeout.current = setTimeout(() => {

//             let newErrors = [...errors];
//             switch (name) {
//                 case 'name':
//                     if (value && validateIDNumber(value)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validateName(value) }];
//                     }
//                     break;
//                 case 'idNumber':
//                     if (value && validateIDNumber(value)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: 'کد ملی را به درستی وارد کنید' }];
//                     }
//                     break;
//                 case 'password':
//                     console.log('value: ', value)
//                     if (value && !validatePassword(value)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
//                     }
//                     break;
//                 case 'reTypePassword':
//                     if (value && !validateReTypePassword(value, formData.personalInfo.password)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validateReTypePassword(value, formData.personalInfo.password) }];
//                     }
//                     break;
//                 case 'agentIdNumber':
//                     if (value && !validatePassword(value)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
//                     }
//                     break;
//                 case 'agentIdNumber':
//                     if (value && !validatePassword(value)) {
//                         newErrors = newErrors.filter((error) => error.name !== name);
//                     } else {
//                         newErrors = [...newErrors.filter((error) => error.name !== name), { name: name, message: validatePassword(value) }];
//                     }
//                     break;
//                 default:
//                     newErrors = newErrors.filter((error) => error.name !== name);
//                     break;
//             }
//             setErrors(newErrors);
//         }, 500);
//     };

//     const requestPermissions = async () => {
//         const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
//         const { status: mediaStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

//         if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
//             // Handle permissions not granted
//             console.log('Permissions not granted');
//         }
//     };

//     const handleFrontPhotoUpload = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== 'granted') {
//             // Permission not granted, handle accordingly
//             console.log('Permission not granted');
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             // Image picked, handle the result
//             setFrontPhoto(result.uri);
//         }
//     };

//     const handleBackPhotoUpload = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== 'granted') {
//             // Permission not granted, handle accordingly
//             console.log('Permission not granted');
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             // Image picked, handle the result
//             setBackPhoto(result.uri);
//         }
//     };

//     console.log('error:', errors);///////////////////////
//     useEffect(() => {
//         console.log('ispersonal: ', ispersonal)

//         updateFormData('userType', { 'userType': ispersonal });
//     }, [ispersonal])


//     // const handlePartnerShip = (PartnerShip) => {
//     //     let IsPartnerShipValue;
//     //     switch (PartnerShip) {
//     //         case 'عضو هیئت مدیره': PartnerShip
//     //             IsPartnerShipValue = 1;
//     //             break;
//     //         case 'رئيس هیئت مدیره':

//     //             IsPartnerShipValue = 2;
//     //             break;
//     //         case 'مدیر عامل':

//     //             IsPartnerShipValue = 3;
//     //             break;
//     //         default:

//     //             IsPartnerShipValue = 1;
//     //             break;
//     //     }

//     //     setIsPartnerShip(IsPartnerShipValue);

//     //     updateFormData('PartnerShip', { 'PartnerShip': PartnerShip });
//     //     console.log(PartnerShip);
//     // }

//     // const addField = () => {
//     //     setShowfield(!showField)
//     // }


//     const renderInputField = (label, name, placeholder, keyboardType = 'default', value = formData.personalInfo[name]) => (
//         <View style={styles.inputLable}>
//             <Text style={styles.inputLable}>{label}</Text>
//             <TextInput
//                 style={[styles.input, focusedInput === name ? styles.inputFocused : null]}
//                 onChangeText={(text) => handleChange(name, text)}
//                 placeholder={placeholder}
//                 value={placeholder}
//                 keyboardType={keyboardType}
//                 onFocus={() => setFocusedInput(name)}
//             />
//             {errors.map((error, index) => (
//                 error.name === name ?
//                     <View key={index} style={{ flexDirection: 'row', paddingTop: 8 }}>
//                         <Icon name='error' width={14} height={14} fill="red" />
//                         <Text style={styles.errorText}>{error.message}</Text>
//                     </View> : null
//             ))}
//         </View>
//     );


//     if (!formData) {
//         return <Text>loading ...</Text>
//     } return (
//         <View style={styles.container}>
//             <View style={styles.signUpForm}>
//                 <>
//                     {renderInputField('نام', 'name', 'امین')}
//                     {renderInputField('نام خانوادگی', 'familyName', 'صالحی')}
//                     {renderInputField('کد ملی', 'idNumber', '1234567890', 'numeric')}
//                     {renderInputField('کد فروشنده', 'selleId', '1234', 'numeric')}
//                     {renderInputField('تاریخ تولد', 'birthday', '۱۳۷۱/۰۷/۱۵')}
//                     <Text style={styles.inputLable}>جنسیت</Text>
//                     <View style={styles.inlineToggle}>
//                         <Pressable onPress={() => handleGenderPress('مرد')}>
//                             <Text style={isSelected ? styles.genderSelectedRight : styles.genderUnSelectedRight}>مرد</Text>
//                         </Pressable>
//                         <Pressable onPress={() => handleGenderPress('زن')}>
//                             <Text style={!isSelected ? styles.genderSelectedLeft : styles.genderUnSelectedLeft}>زن</Text>
//                         </Pressable>
//                     </View>
//                     {renderInputField('رمز عبور', 'password', 'Aa12345678')}
//                     <CustomTouchableOpacity style={styles.accountListContainer} >
//                         <Text style={styles.shopList}>
//                             تغییر  رمز عبور
//                         </Text>

//                     </CustomTouchableOpacity>

//                     <View style={styles.container}>
//                         <View style={styles.signUpForm}>


//                             <Text style={{ fontFamily: 'IRANSansWeb' }}>مدارک فروشنده</Text>
//                             {frontPhoto && <Image source={{ uri: frontPhoto }} style={{ width: 100, height: 100 }} />}
//                             <TouchableOpacity style={styles.uploadBox} onPress={handleFrontPhotoUpload}>
//                                 <View style={styles.textInsideTouchableOpacity}>
//                                     <Text style={{ fontFamily: 'IRANSansWeb' }}>تصویر جلو</Text>
//                                 </View>
//                             </TouchableOpacity>

//                             {backPhoto && <Image source={{ uri: backPhoto }} style={{ width: 100, height: 100 }} />}
//                             <TouchableOpacity style={styles.uploadBox} onPress={handleBackPhotoUpload}>
//                                 <View style={styles.textInsideTouchableOpacity}>
//                                     <Text style={{ fontFamily: 'IRANSansWeb' }} >تصویر پشت</Text>
//                                 </View>
//                             </TouchableOpacity>

//                             {!ispersonal && (
//                                 <TouchableOpacity style={styles.uploadBox} onPress={handleFrontPhotoUpload}>
//                                     <View style={styles.textInsideTouchableOpacity}>
//                                         <Text style={{ fontFamily: 'IRANSansWeb' }}>تصویر جلو</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     </View>
//                     <Pressable style={styles.submitFormData} >
//                         <Text style={styles.submitFormDataText}>
//                             ثبت تغییرات
//                         </Text>
//                     </Pressable>
//                 </>
//             </View>
//         </View>
//     );
// }


import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import Icon from '../../../components/Icon/Icon';
import { validateIDNumber, validatePassword, validateAgentIDNumber, validateReTypePassword, validateName } from '../../../services/Validation/FormValidation';
import CustomTouchableOpacity from '../../../components/CustomTouchableOpacity/CustomTouchableOpacity';

const AccountPersonalInfo = () => {

    const { formData, updateFormData } = useFormData();
    const [isSelected, setIsSelected] = useState(true);
    const [focusedInput, setFocusedInput] = useState('');
    const [errors, setErrors] = useState([]);
    const debounceTimeout = useRef(null);
    const [frontPhoto, setFrontPhoto] = useState(null);
    const [backPhoto, setBackPhoto] = useState(null);
    const [fakeData, setFakeData] = useState({
        name: 'میلاد',
        familyName: 'فلاح',
        idNumber: '4210200859',
        selleId: '5421',
        birthday: '۱۳۷۱/۰۷/۱۵',
        password: 'Aa12345678',
    });

    const handleChange = (name, value) => {
        setFakeData({ ...fakeData, [name]: value });
        clearTimeout(debounceTimeout.current); // Clear previous timeout
        debounceTimeout.current = setTimeout(() => {
            let newErrors = [...errors];
            switch (name) {
                case 'name':
                    if (value && validateIDNumber(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name, message: validateName(value) }];
                    }
                    break;
                case 'idNumber':
                    if (value && validateIDNumber(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name, message: 'کد ملی را به درستی وارد کنید' }];
                    }
                    break;
                case 'password':
                    if (value && !validatePassword(value)) {
                        newErrors = newErrors.filter((error) => error.name !== name);
                    } else {
                        newErrors = [...newErrors.filter((error) => error.name !== name), { name, message: validatePassword(value) }];
                    }
                    break;
                default:
                    newErrors = newErrors.filter((error) => error.name !== name);
                    break;
            }
            setErrors(newErrors);
        }, 500);
    };

    const handleSubmit = () => {
        if (errors.length > 0) {
            Alert.alert('خطا', 'لطفاً اطلاعات وارد شده را بررسی کنید.');
        } else {
            Alert.alert('موفقیت', 'اطلاعات با موفقیت ثبت شد.');
            console.log('Form Data:', formData); // You can replace this with actual submission logic.
        }
    };

    const renderInputField = (label, name, placeholder, keyboardType = 'default') => (
        <View style={styles.inputLable}>
            <Text style={styles.inputLable}>{label}</Text>
            <TextInput
                style={[styles.input, focusedInput === name ? styles.inputFocused : null]}
                onChangeText={(text) => handleChange(name, text)}
                placeholder={placeholder}
                value={fakeData[name]}
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

    return (
        <View style={styles.container}>
            <View style={styles.signUpForm}>
                <>
                    {renderInputField('نام', 'name', 'امین')}
                    {renderInputField('نام خانوادگی', 'familyName', 'صالحی')}
                    {renderInputField('کد ملی', 'idNumber', '1234567890', 'numeric')}
                    {renderInputField('کد فروشنده', 'selleId', '1234', 'numeric')}
                    {renderInputField('تاریخ تولد', 'birthday', '۱۳۷۱/۰۷/۱۵')}
                    {renderInputField('رمز عبور', 'password', 'Aa12345678')}
                    <Pressable style={styles.submitFormData} onPress={handleSubmit}>
                        <Text style={styles.submitFormDataText}>
                            ثبت تغییرات
                        </Text>
                    </Pressable>
                </>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signUpForm: {
        backgroundColor: "#fff",
        padding: 16,
        width: "100%",
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 10,
    },
    inline: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 10,
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
        width: "100%",
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
        paddingTop: 14,
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
    accountListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'center',
        // 
        height: 48,
        marginVertical: 50,
        borderWidth: 1,
        borderColor: '#24caa1', // Change border color when
        borderRadius: 8,
    },
    shopList: {
        fontFamily: 'IRANSansWeb',
        color: "#24CAA1",
        // textAlign: 'center',
        // paddingVertical: 16,
    },
    submitFormData: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 280,
        height: 48,
        marginVertical: 50,
        borderRadius: 8,
        backgroundColor: "#24CAA1",
    },
    submitFormDataText: {
        fontFamily: 'IRANSansWeb',
        color: "#fff",
        textAlign: 'center',
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
export default AccountPersonalInfo;


