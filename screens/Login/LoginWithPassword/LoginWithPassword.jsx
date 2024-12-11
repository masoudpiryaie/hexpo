import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import axios from 'axios';
import { Svg, Path } from "react-native-svg";
import { useUserContext } from "../../../services/AuthContext/AuthContext";
import ForgetPassword from './ForgetPassword/ForgetPassword';
// import Dashboard from "../../Dashboard/DashBoard";
import * as SecureStore from 'expo-secure-store';
import Stacknavigation from "../../../services/StackNavigation.js/Stacknavigation";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity/CustomTouchableOpacity";
import { useApi } from "../../../services/FetchApi/FetchApi";




const LoginWithPassword = () => {
    const [responseData, setResponseData] = useState(null);
    const { password, setPassword } = useUserContext('')
    const { phoneNumber } = useUserContext('')
    const { isLoggedIn, setIsLoggedIn } = useUserContext();
    const [resendTimer, setResendTimer] = useState(5); // set it on 150 seconds
    const { isLoginWithPassword, setIsLoginWithPassword } = useUserContext();
    const [loginWithVerifyCode, setLoginWithVerifyCode] = useState(false)
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isForgetPassword, setIsForgetPassWord] = useState(false)
    const [newToken, setNewToken] = useState();
    const { login } = useUserContext();
    const [testLog, setTestLog] = useState(0);
    const authTokenRef = useRef();
    const { token } = useUserContext();
    const { apiCall, loading } = useApi();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    useEffect(() => {
        let timer;
        if (loginWithVerifyCode && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [loginWithVerifyCode, resendTimer]);

    useEffect(() => {
        if (resendTimer === 0) {
            setShowResendButton(true);
        }
    }, [resendTimer]);


    useEffect(() => {
        login(newToken);
        console.log('newToken to use: ', newToken)
    }, [newToken])

    const LoginWithPass = () => {
        console.log('send sms')
        let authToken;


        axios.post('http://172.16.100.49:4000/v1/auth', {
            mobile: phoneNumber,
            password: password,

        })

            .then(response => {
                if (response.data.state = true) {
                    setIsLoggedIn(1)
                    authToken = response.data.data.authToken;
                    const token = response.data.data.authToken;
                    console.log('toooooooooooooooooo', token)
                    login(token);
                    // setAuthToken(token);
                } else {
                    Alert.alert("رمز وارد شده اشتباه است")
                    console.log('رمز اشتباه است');
                }
                console.log('response: ', response.data);

            })
            .catch(error => {
                console.log(error);
                Alert.alert('ارور',);

            });
    };

    // const LoginWithPass = () => {
    //     console.log('Attempting to send login request...');

    //     try {
    //         const response = axios.post('http://172.16.100.49:4000/v1/auth', {
    //             mobile: phoneNumber,
    //             password: password,
    //         });

    //         console.log('response: ', response.data);

    //         if (response.data.state === true) {
    //             const token = response.data.data.authToken;
    //             console.log('authToken: ', token);

    //             // Save the token and log in
    //             setAuthToken(token);
    //             authTokenRef.current = token;
    //             login(token);

    //             console.log('authTokenRef.current: ', authTokenRef.current);
    //             setNewToken(token);

    //             // Note: newToken will be updated in the next render
    //             setIsLoggedIn(1);
    //         } else {
    //             Alert.alert("رمز وارد شده اشتباه است");
    //             console.log('Incorrect password');
    //         }
    //     } catch (error) {
    //         console.error('Error during login: ', error);
    //         Alert.alert('ارور', 'An error occurred. Please try again.');
    //     }
    // };

    // const LoginWithPass = async () => {
    //     console.log('send sms');
    //     let authToken;

    //     await axios.post('http://172.16.100.49:4000/v1/auth', {
    //         mobile: phoneNumber,
    //         password: password,
    //     })
    //         .then(response => {
    //             if (response.data.state === true) {
    //                 const authToken = response.data.data.authToken;
    //                 console.log('authToken: ', response.data)

    //                 login(authToken)

    //                 // Store the token in the ref for immediate use
    //                 authTokenRef.current = authToken;

    //                 // Call the login function with the token from the ref

    //                 // const ttt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODExMSwiaWF0IjoxNzE1Nzc4MTkwLCJleHAiOjE3MTU4NjQ1OTB9.MKLoXaBQBzFDicMLfh6RcO7CuHd7RNiiTZX5A1 - ue8w';
    //                 console.log('authTokenRef.current: ', authTokenRef.current);
    //                 setNewToken(authToken)

    //                 console.log('newToken: ', newToken)
    //                 setIsLoggedIn(1);
    //             } else {
    //                 Alert.alert("رمز وارد شده اشتباه است");
    //                 console.log('رمز اشتباه است');
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             Alert.alert('ارور');
    //         });
    // };
    console.log('newToken lastUpdate: ', newToken);

    const LoginWithVerifyCode = () => {
        // console.log('loginWithVerifyCode:', loginWithVerifyCode);
        console.log('sms send');
        setLoginWithVerifyCode(true)
        axios.post('http://172.16.100.49:4000/v1/auth/sms', {
            mobile: phoneNumber
        })
            .then(response => {
                console.log('response.data.state: ', response.data.state)
            })
        console.error(" کد تایید برای شما ارسال شد ");

    }

    const handleResend = () => {
        setResendTimer(5);
        setShowResendButton(false)
        LoginWithVerifyCode();

    }


    const VerifingwithCode = () => {

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
            login()
            console.log('verificationCode: ', verificationCode)
            // setIsLoggedIn(1)
            // setTestLog(1)
            // setTestLog(1)
            console.log(testLog, 'testLog')
            // setIsLoginWithPassword(3)

            console.log('isLoginWithPassword*: ', isLoginWithPassword)
            console.log('isLoggedIn*******: ', isLoggedIn)
            console.log('isLoggedI: ', isLoggedIn);
            Alert.alert("کد تایید معتبر است");
            console.log('first', token)
        }
        else {
            Alert.alert("کد تایید نامعتبر است");
        };
    }
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    console.log(isLoggedIn, '11111')

    return (
        <>
            {
                isForgetPassword ? <View>
                    <Text>
                        forget
                    </Text>
                </View>
                    :
                    (
                        <>
                            {!loginWithVerifyCode ? (
                                <View style={styles.loginForm} >
                                    <Pressable style={styles.ltr} onPress={() => setIsLoginWithPassword(null)}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z" fill="#292D32" />
                                            <Path d="M20.5 12.75H3.67004C3.26004 12.75 2.92004 12.41 2.92004 12C2.92004 11.59 3.26004 11.25 3.67004 11.25H20.5C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75Z" fill="#292D32" />
                                        </Svg>
                                    </Pressable>
                                    <View>
                                        <Text style={styles.loginText} >ورود با رمز عبور</Text>
                                        <Text style={{ fontFamily: 'IRANSansWeb' }}>
                                            رمز عبور خود را وارد کنید
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={styles.password}
                                        placeholder={""}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}

                                    />
                                    <Pressable style={styles.btnLogin} onPress={LoginWithPass}  >
                                        <Text style={styles.btnText} color="#fff">
                                            تایید و ادامه
                                        </Text>
                                    </Pressable>
                                    <Pressable style={{ alignItems: 'center', flexDirection: 'row', marginTop: 24 }} onPress={LoginWithVerifyCode} >
                                        <Text style={styles.backText}>ورود با رمز یکبار مصرف</Text>
                                        <Svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M8.00003 17.67C7.81003 17.67 7.62003 17.6 7.47003 17.45L0.950029 10.93C-0.109971 9.87002 -0.109971 8.13002 0.950029 7.07002L7.47003 0.55002C7.76003 0.26002 8.24003 0.26002 8.53003 0.55002C8.82003 0.84002 8.82003 1.32002 8.53003 1.61002L2.01003 8.13002C1.53003 8.61002 1.53003 9.39002 2.01003 9.87002L8.53003 16.39C8.82003 16.68 8.82003 17.16 8.53003 17.45C8.38003 17.59 8.19003 17.67 8.00003 17.67Z" fill="#24CAA1" />
                                        </Svg>
                                    </Pressable>
                                    <Pressable style={{ alignItems: 'center', flexDirection: 'row', marginTop: 24 }}
                                        onPress={() => { setIsForgetPassWord(true) }}>
                                        <Text style={styles.backText}>فراموشی رمز عبور</Text>
                                        <Svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M8.00003 17.67C7.81003 17.67 7.62003 17.6 7.47003 17.45L0.950029 10.93C-0.109971 9.87002 -0.109971 8.13002 0.950029 7.07002L7.47003 0.55002C7.76003 0.26002 8.24003 0.26002 8.53003 0.55002C8.82003 0.84002 8.82003 1.32002 8.53003 1.61002L2.01003 8.13002C1.53003 8.61002 1.53003 9.39002 2.01003 9.87002L8.53003 16.39C8.82003 16.68 8.82003 17.16 8.53003 17.45C8.38003 17.59 8.19003 17.67 8.00003 17.67Z" fill="#24CAA1" />
                                        </Svg>
                                    </Pressable>
                                </View >
                            )
                                :
                                (
                                    <View style={styles.loginForm} >
                                        <Pressable style={styles.ltr} onPress={() => setIsLoginWithPassword(null)}>
                                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z" fill="#292D32" />
                                                <Path d="M20.5 12.75H3.67004C3.26004 12.75 2.92004 12.41 2.92004 12C2.92004 11.59 3.26004 11.25 3.67004 11.25H20.5C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75Z" fill="#292D32" />
                                            </Svg>

                                        </Pressable>

                                        <View>
                                            <Text style={styles.loginText} >ورود و ثبت نام</Text>
                                            <Text>
                                                کد تایید ارسال شده را وارد کنید
                                            </Text>
                                        </View>
                                        <TextInput
                                            style={styles.password}
                                            placeholder={""}
                                            value={verificationCode}
                                            onChangeText={(text) => setVerificationCode(text)}
                                            keyboardType="phone-pad"
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

                                        <CustomTouchableOpacity style={styles.btnLogin} onPress={VerifingwithCode}>
                                            <Text style={styles.btnText} color="#fff">
                                                تایید و ادامه
                                            </Text>
                                        </CustomTouchableOpacity>
                                    </View >
                                )

                            }
                        </>
                    )
            }
        </>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {

        alignItems: "center",
    },
    loginForm: {
        backgroundColor: "#fff",
        padding: 24,
        width: 350, // Adjusted for tablets
        borderRadius: 12,
        marginTop: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    icon: {
        right: 35
    },
    ltr: {
        flexDirection: 'row-reverse'
    },
    loginText: {
        flex: 1,
        justifyContent: "center",
        fontSize: 16,
        // fontWeight: 500,
        marginBottom: 24,
        fontFamily: 'IRANSansWeb'
    },
    password: {
        color: "#757575",
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        textAlign: "right",
        alignItems: "flex-end",
        marginTop: 12,
        marginBottom: 16,
        fontFamily: 'IRANSansWeb',
    },
    informText: {
        fontSize: 10,
        marginBottom: 16,
        paddingRight: 4,
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
        fontFamily: 'IRANSansWeb',
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
        fontFamily: 'IRANSansWeb',
    },
    btnText: {
        color: "#fff",
        fontFamily: 'IRANSansWeb',
    },
    backText: {
        flexDirection: 'row',
        color: '#24CAA1',
        paddingLeft: 12,

        fontFamily: 'IRANSansWeb',
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

    }

});



export default LoginWithPassword;