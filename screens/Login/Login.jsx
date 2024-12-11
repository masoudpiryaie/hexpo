import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Platform } from "react-native";
import { useUserContext } from '../../services/AuthContext/AuthContext'

import VendorLogo from "../../components/VendorLogo";
import SignUp from "../SignUp";
import Svg, { Path } from 'react-native-svg';
// import axios from 'axios';
import CustomText from '../../components/CustomText/CustomText';
import LoginWithPassword from "./LoginWithPassword/LoginWithPassword";
// import HomeScreen from '../Dashboard/HomeScreen2';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    View,
    Pressable,
} from "react-native";
// import BottomTabNavigation from "../../components/BottomTabNavigation/BottomTabNavigation";
// import Dashboard from '../Dashboard/DashBoard';
import Stacknavigation from "../../services/StackNavigation.js/Stacknavigation";
import HomeScreen from "../Dashboard/HomeScreen";
import DrawerNavigation from "../../components/DrawerNavigation/DrawerNavigation";
import axios from "axios";
// import axios from "../../services/axios/axios";
// import axios from "../../services/axios/axios";
// import NavigationScreen from "../../components/BottomTabNavigation/BottomTabNavigation";



const LoginWithMobile = () => {
    const { phoneNumber, setPhoneNumber } = useUserContext();
    const { password, setPassword } = useUserContext();
    const { verifyCode, setVerifyCode } = useUserContext();
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [resendTimer, setResendTimer] = useState(5); // set it on 150 seconds
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const { isLoginWithPassword, setIsLoginWithPassword } = useUserContext();
    // const [loginWithPassword, setLoginWithPassword] = useState
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const { isSignUp } = useUserContext();




    // const backToSendVerificationCode = () => {
    //     setIsVerificationSent(false);
    //     setPhoneNumber('');
    //     setVerificationCode('');
    // }

    useEffect(() => {
        console.log('useeffect : useeffect')
        if (isVerificationSent && resendTimer > 0 && isLoginWithPassword !== 2) {
            const timer = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
                console.log(resendTimer);
            }, 1000);

            return () => clearInterval(timer);
        }
        if (phoneNumber.startsWith('09') && phoneNumber.length === 11) {
            setIsValidPhoneNumber(true);
        } else {
            setIsValidPhoneNumber(false);
        }
    }, [isVerificationSent, phoneNumber, resendTimer]);

    useEffect(() => {
        if (resendTimer === 0) {
            setShowResendButton(true);
            setIsLoginWithPassword(0)
        }
    }, [resendTimer]);
    const sendVerificationCode = () => {
        console.log("Sending verification code for phone number:", phoneNumber);
        return axios.post('http://172.16.100.49:4000/v1/checkuser', {
            mobile: phoneNumber,
        })
            .then(response => {
                console.log('request send');
                console.log('passResponse2', response.data.pass);
                // console.log('dataResponse2', response.data);
                setIsVerificationSent(true)
                if (response.data && response.data.pass == "2") {
                    setIsLoginWithPassword(2);
                    // console.log('ورود با رمز عبور');
                    console.log('isLoginWithPassword', isLoginWithPassword);

                } else if (response.data && response.data.pass == "1") {
                    console.log('isLoginWithPassword', isLoginWithPassword);
                    setIsLoginWithPassword(1);
                    axios.post('http://172.16.100.49:4000/v1/auth/sms', {
                        mobile: phoneNumber
                    })
                        .then(response => {
                            console.log(response.data.state)
                        })
                    console.error(" کد تایید برای شما ارسال شد ");
                } else {
                    console.log('isLoginWithPassword', isLoginWithPassword);
                    setIsLoginWithPassword(0);
                    axios.post('http://172.16.100.49:4000/v1/auth/sms', {
                        mobile: phoneNumber
                    })
                        .then(response => {
                            console.log(response.data.state)
                        })
                    console.error(" کد ارسال شد و ثبت نام خود را انجام دهید");
                    // console.log('response', response)
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Alert.alert("Error", "شبکه خود را چک کنید . کد ارسال نشد");
            });
    };



    const pressBackButton = () => {
        if (resendTimer === 0 && phoneNumber !== "") {
            setPhoneNumber("");
            setIsVerificationSent(false);
            setResendTimer(5);
            setShowResendButton(false);
            setIsLoginWithPassword(null)
            // Reset any other states as needed
        }
        setIsLoginWithPassword(null)
    }
    const handleResend = () => {
        setResendTimer(5);    // set it on 150 seconds
        setVerificationCode('')
        // setIsVerificationSent(true);
        setShowResendButton(false);
        sendVerificationCode()

        console.warn("درخواست ارسال مجدد کد تایید");
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const VerifingCode = () => {

        //     return axios.post('http://172.16.100.49:4000/v1/auth', {
        //         verify_code: verificationCode
        //     })
        //         .then(response => {
        //             if verificationCode
        //             console.log(response.data);
        //             Alert.alert('Success', 'Code is valid!');
        //         })
        //         .catch(error => {
        //             console.error(error);
        //             Alert.alert('Error', 'Failed to check the code.');
        //         });
        // };

        if (verificationCode === '224466') {
            setIsLoggedIn(1)

            Alert.alert("کد تایید معتبر است");
        }
        else {
            Alert.alert("کد تایید نامعتبر است");
        };
    }
    console.log('isLoginWithPassword: ', isLoginWithPassword);
    console.log('isLoggedIdfdfdfdn: ', isLoggedIn);
    console.log('phoneNumber: ', phoneNumber);
    console.log("resendTimer: ", resendTimer);
    console.log('isVerificationSent: ', isVerificationSent);
    return (
        <View style={styles.container}>


            {isLoggedIn == 1 && isLoginWithPassword == 0
                ?
                <SignUp />
                :
                isLoggedIn == 1 && isLoginWithPassword == 1
                    ?
                    <Stacknavigation />
                    :
                    isLoggedIn == 1 && isLoginWithPassword == 2
                        ?
                        <Stacknavigation />
                        :
                        <View style={styles.formContainer}>
                            <VendorLogo />
                            {isLoginWithPassword === null ? (
                                <View style={styles.loginForm}>
                                    <View style={styles.loginfulltext}>
                                        <Text style={styles.loginText}>ورود / ثبت نام</Text>
                                        <Text style={styles.inputLabel}>
                                            شماره همراه خود را وارد کنید
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={styles.phoneNumber}
                                        placeholder={"09121234567"}
                                        value={phoneNumber}
                                        onChangeText={(text) => setPhoneNumber(text)}
                                        keyboardType="phone-pad"

                                    />
                                    <Pressable
                                        style={!isValidPhoneNumber ? styles.btnLoginDisable : styles.btnLogin}
                                        disabled={!isValidPhoneNumber}
                                        onPress={sendVerificationCode}
                                    >
                                        <Text style={styles.btnText} color="#fff">
                                            تایید و ادامه
                                        </Text>
                                    </Pressable>
                                </View>
                            ) : isLoginWithPassword == 2 ? (
                                <LoginWithPassword />
                            ) : isLoginWithPassword == 1 || isLoginWithPassword === 0 ? (
                                <View style={styles.loginForm}>
                                    <View style={styles.inline}>
                                        <Text style={styles.inputLabel}>
                                            کد تایید ارسال شده را وارد کنید
                                        </Text>
                                        <Pressable onPress={pressBackButton}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            >
                                                <Path
                                                    d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
                                                />
                                            </Svg>
                                        </Pressable>
                                    </View>
                                    <TextInput
                                        style={styles.phoneNumber}
                                        placeholder={""}
                                        value={verificationCode}
                                        onChangeText={(text) => setVerificationCode(text)}
                                        keyboardType="numeric"
                                    />
                                    {!showResendButton && (
                                        <Text style={styles.codeTimeRemaining}>
                                            {`${formatTime(resendTimer)}  مانده تا دریافت مجدد کد تایید `}
                                        </Text>
                                    )}
                                    {showResendButton && (
                                        <Pressable
                                            onPress={handleResend}
                                            disabled={!showResendButton}
                                        >
                                            <Text style={styles.resendCodeText} color="#fff">
                                                دریافت مجدد کد تایید
                                            </Text>
                                        </Pressable>
                                    )}
                                    <Pressable style={styles.btnLogin} onPress={VerifingCode}>
                                        <Text style={styles.btnText} color="#fff">
                                            تایید و ادامه
                                        </Text>
                                    </Pressable>
                                </View>
                            ) : null}
                        </View>}



        </View >
    );

};
//styles............

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

// Adjust form container width for tablets
const formContainerWidth = isTablet ? 528 : 328;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignSelf: 'center',
        // margin: 'auto',
    },
    formContainer: {
        width: 328,
        alignItems: "center",
        alignSelf: 'center',
    },
    loginForm: {
        backgroundColor: "#fff",
        padding: 14,
        width: "100%", // Adjusted for tablets
        borderRadius: 12,
        marginTop: 40,
    },
    loginText: {
        flex: 1,
        justifyContent: "center",
        fontSize: 16,
        // fontWeight: 500,
        marginBottom: 24,
        fontFamily: 'IRANSansWeb',
    },
    inputLabel: {

        fontSize: 14,
        fontFamily: 'IRANSansWeb',

    },
    phoneNumber: {
        color: "#323232",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        textAlign: "right",
        alignItems: "flex-end",
        marginTop: 12,
        fontFamily: 'IRANSansWeb',
    },
    btnLoginInvalid: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        backgroundColor: "#9aedd8",
        color: "#323232",
        fontFamily: 'IRANSansWeb'
    },
    btnLoginDisable: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        backgroundColor: "#9aedd8",
        color: "#fff",

        fontFamily: 'IRANSansWeb'
    },
    btnLogin: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        backgroundColor: "#24caa1",
        color: "#fff",
        fontFamily: 'IRANSansWeb'
    },
    btnText: {
        color: "#fff",
        fontFamily: 'IRANSansWeb',
    },

    // enterCode styles

    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    codeTimeRemaining: {
        fontSize: 12,
        color: "#757575",
        textAlign: "center",
        paddingTop: 24,
        paddingBottom: 24,
        fontFamily: 'IRANSansWeb',
    },
    resendCodeText: {
        color: "#2F89F5",
        textAlign: "center",
        paddingTop: 24,
        paddingBottom: 24,
        fontFamily: 'IRANSansWeb',

    }
});

export default LoginWithMobile;

