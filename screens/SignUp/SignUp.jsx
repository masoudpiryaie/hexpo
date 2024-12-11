import React from "react";
import { useState, useRef } from 'react'
import { View, Text, Pressable, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import BankAccountInfo from './BankAccountInfo';
// import { Form, FormikProvider } from "formik";
import DisplayFormData from "./DisplaySignUpFormData/DisplaySignUpFormData";
import { FormDataProvider, useFormData } from "../../services/FormDataContext/FormDataContext";
// import IdCardInfo from "./IdCardUpload/IdCardUpload";
import CustomCheckbox from "../../components/Checkbox/Checkbox";
import Login from "../Login";
import Thanks from "./Thanks/Thanks";
import axios from "axios";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const { formData } = useFormData()
    const scrollViewRef = useRef();

    const handleNext = () => {
        console.log('formData.contactInfo.homeNumber', formData.contactInfo.homeNumber);

        if (step < 6) {
            const nextStep = step + 1;
            setStep(nextStep);
            scrollViewRef.current.scrollTo({ y: 1, animated: true });

        } else {
            Alert.alert(step);
        }
    }

    const handleBack = () => {
        if (step > 1) {
            const prevStep = step - 1;
            setStep(prevStep);
            scrollViewRef.current.scrollTo({ y: 0, animated: true });

        } else {
            // Handle reaching the maximum step
            Alert.alert(step);
        }
    }

    const handleSendUserData = () => {
        console.log(formData);
    }

    return (
        <>
            <ScrollView ref={scrollViewRef}>
                <View style={[styles.inline, { paddingLeft: 50 }]}>
                    <Pressable style={[
                        styles.pressable,
                        { flexDirection: "row-reverse", paddingLeft: 10 }
                    ]}
                        onPress={handleBack}
                    >
                        <Svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><Path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" /></Svg>
                    </Pressable>
                    <Text style={{ fontFamily: 'IRANSansWeb' }}>
                        فرم ثبت نام پنل فروشنده حامی کت
                    </Text>
                </View>
                <View>
                    {/* {step === 0 && <Login />} */}
                    {step === 1 && <PersonalInfo />}
                    {step === 2 && <ContactInfo />}
                    {step === 3 && <BankAccountInfo />}
                    {/* {step === 4 && <IdCardInfo />} */}
                    {step === 5 && <DisplayFormData formData={formData} />}
                    {step === 6 && <Thanks />}
                </View>
            </ScrollView >
            <View style={styles.stickyContainer}>

                {step < 5 && (
                    <Pressable
                        style={[styles.nextButtonContainer]}
                        onPress={handleNext}
                        disabled={step > 5}
                    >
                        <Text style={[styles.nextBtnText]} color="#fff">
                            تایید و ادامه
                        </Text>
                    </Pressable>)}
                {step === 5 && (
                    <View style={styles.twinButton}>
                        <Pressable
                            style={styles.sendBtnEnd}
                            onPress={handleSendUserData}
                        >
                            <Text style={[styles.nextBtnText]} color="#fff">
                                ارسال درخواست
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.prevBtn}
                            onPress={handleBack}
                        >
                            <Text style={[styles.prevBtnText]} color="#fff">
                                بازگشت
                            </Text>
                        </Pressable>
                    </View>
                )
                }
            </View>
        </>
    )
};
const styles = StyleSheet.create({
    stickyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: 100,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 24,
        backgroundColor: '#fff'

    },
    nextButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "#24caa1",
        color: "#fff",
        width: 280,
        height: 48,
        padding: 12,
        margin: 20,
        borderRadius: 8,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 60,
    },
    twinButton: {
        flexDirection: 'row',
        justifyContent: "   center",
        justifyContent: " center",
        alignContent: "center",
        alignItems: "center",
    },
    nextBtnText: {
        color: "#fff",
        fontFamily: 'IRANSansWeb',
        textAlign: 'center'

    },
    prevBtnText: {
        fontFamily: 'IRANSansWeb',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color: "#24CAA1",
    },
    sendBtnEnd: {
        justifyContent: 'center',
        borderWidth: 0,
        backgroundColor: "#24caa1",
        color: "#fff",
        width: 141,
        height: 48,
        borderRadius: 8,
        fontFamily: 'IRANSansWeb',
        margin: 20
    },
    prevBtn: {
        justifyContent: 'center',
        borderWidth: 1.6,
        borderColor: '#24CAA1',
        backgroundColor: "#fff",
        color: "#24CAA1",
        width: 141,
        height: 48,
        margin: 20,
        borderRadius: 8,
        fontFamily: 'IRANSansWeb'
    },
})

export default SignUp;