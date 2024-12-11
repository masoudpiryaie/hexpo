import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useUserContext } from "../../../../services/AuthContext/AuthContext";
import VendorLogo from "../../../../components/VendorLogo"
import { Svg, Path } from "react-native-svg";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from '../../../../components/Icon/Icon';
import axios from "axios";



const ForgetPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const { password, setPassword } = useUserContext()
    const [retypePassword, setRetypePassword] = useState()
    const { formError, setFormError } = useUserContext()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const toggleRetypePasswordVisibility = () => {
        setShowRetypePassword((prevshowRetypePassword) => !prevshowRetypePassword);
    };
    const RetypePassword = (newText) => {
        setRetypePassword(newText);
        if (newText !== password) {
            setFormError("رمزهای عبور مطابقت ندارند");
        } else if (
            newText.length < 8 || // Check if the password length is less than 8
            !/[0-9]/.test(newText) || // Check if the password contains a digit
            !/[a-z]/.test(newText) || // Check if the password contains a lowercase letter
            !/[A-Z]/.test(newText) // Check if the password contains an uppercase letter
        ) {
            setFormError('رمز طبق الگوی تعریف شده نیست.');
        } else {
            setFormError("");
        }
    }
    ////////////////////////////////////
    const LoginWithPass = () => {
        axios.post(BASE_URL + '/auth', {
            pass: password
        })
    }

    const [phoneNumber, setPhoneNumber] = useState('');
    return (
        <View style={styles.formContainer}>
            < View style={styles.loginForm} >
                <Pressable>
                    <Icon name="leftArrow" width={16} height={16} />
                </Pressable>
                <View>

                    <Text style={styles.loginText} >ایجاد رمز عبور</Text>
                    <Text>
                        رمز عبور جدید
                    </Text>
                    <View style={styles.inputContainer} >
                        <TextInput
                            style={styles.password}
                            placeholder={""}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {showPassword ? (
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M12 16.3299C9.61004 16.3299 7.67004 14.3899 7.67004 11.9999C7.67004 9.60992 9.61004 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17004 10.4399 9.17004 11.9999C9.17004 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" fill="#292D32" />
                                        <Path d="M12 21.02C8.23996 21.02 4.68996 18.82 2.24996 15C1.18996 13.35 1.18996 10.66 2.24996 8.99998C4.69996 5.17998 8.24996 2.97998 12 2.97998C15.75 2.97998 19.3 5.17998 21.74 8.99998C22.8 10.65 22.8 13.34 21.74 15C19.3 18.82 15.75 21.02 12 21.02ZM12 4.47998C8.76996 4.47998 5.67996 6.41998 3.51996 9.80998C2.76996 10.98 2.76996 13.02 3.51996 14.19C5.67996 17.58 8.76996 19.52 12 19.52C15.23 19.52 18.32 17.58 20.48 14.19C21.23 13.02 21.23 10.98 20.48 9.80998C18.32 6.41998 15.23 4.47998 12 4.47998Z" fill="#292D32" />
                                    </Svg>


                                ) : (
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.47004 15.2799C9.28004 15.2799 9.09004 15.2099 8.94004 15.0599C8.12004 14.2399 7.67004 13.1499 7.67004 11.9999C7.67004 9.60992 9.61004 7.66992 12 7.66992C13.15 7.66992 14.24 8.11992 15.06 8.93992C15.2 9.07992 15.28 9.26992 15.28 9.46992C15.28 9.66992 15.2 9.85992 15.06 9.99992L10 15.0599C9.85004 15.2099 9.66004 15.2799 9.47004 15.2799ZM12 9.16992C10.44 9.16992 9.17004 10.4399 9.17004 11.9999C9.17004 12.4999 9.30004 12.9799 9.54004 13.3999L13.4 9.53992C12.98 9.29992 12.5 9.16992 12 9.16992Z" fill="#292D32" />
                                        <Path d="M5.59997 18.51C5.42997 18.51 5.24997 18.45 5.10997 18.33C4.03997 17.42 3.07997 16.3 2.25997 15C1.19997 13.35 1.19997 10.66 2.25997 8.99998C4.69997 5.17998 8.24997 2.97998 12 2.97998C14.2 2.97998 16.37 3.73998 18.27 5.16998C18.6 5.41998 18.67 5.88998 18.42 6.21998C18.17 6.54998 17.7 6.61998 17.37 6.36998C15.73 5.12998 13.87 4.47998 12 4.47998C8.76997 4.47998 5.67997 6.41998 3.51997 9.80998C2.76997 10.98 2.76997 13.02 3.51997 14.19C4.26997 15.36 5.12997 16.37 6.07997 17.19C6.38997 17.46 6.42997 17.93 6.15997 18.25C6.01997 18.42 5.80997 18.51 5.59997 18.51Z" fill="#292D32" />
                                        <Path d="M11.9999 21.02C10.6699 21.02 9.36994 20.75 8.11994 20.22C7.73994 20.06 7.55994 19.62 7.71994 19.24C7.87994 18.86 8.31994 18.68 8.69994 18.84C9.75994 19.29 10.8699 19.52 11.9899 19.52C15.2199 19.52 18.3099 17.58 20.4699 14.19C21.2199 13.02 21.2199 10.98 20.4699 9.81C20.1599 9.32 19.8199 8.85 19.4599 8.41C19.1999 8.09 19.2499 7.62 19.5699 7.35C19.8899 7.09 20.3599 7.13 20.6299 7.46C21.0199 7.94 21.3999 8.46 21.7399 9C22.7999 10.65 22.7999 13.34 21.7399 15C19.2999 18.82 15.7499 21.02 11.9999 21.02Z" fill="#292D32" />
                                        <Path d="M12.69 16.2701C12.34 16.2701 12.02 16.0201 11.95 15.6601C11.87 15.2501 12.14 14.8601 12.55 14.7901C13.65 14.5901 14.57 13.6701 14.77 12.5701C14.85 12.1601 15.24 11.9001 15.65 11.9701C16.06 12.0501 16.33 12.4401 16.25 12.8501C15.93 14.5801 14.55 15.9501 12.83 16.2701C12.78 16.2601 12.74 16.2701 12.69 16.2701Z" fill="#292D32" />
                                        <Path d="M1.99994 22.75C1.80994 22.75 1.61994 22.68 1.46994 22.53C1.17994 22.24 1.17994 21.76 1.46994 21.47L8.93994 14C9.22994 13.71 9.70994 13.71 9.99994 14C10.2899 14.29 10.2899 14.77 9.99994 15.06L2.52994 22.53C2.37994 22.68 2.18994 22.75 1.99994 22.75Z" fill="#292D32" />
                                        <Path d="M14.53 10.2199C14.34 10.2199 14.15 10.1499 14 9.99994C13.71 9.70994 13.71 9.22994 14 8.93994L21.47 1.46994C21.76 1.17994 22.24 1.17994 22.53 1.46994C22.82 1.75994 22.82 2.23994 22.53 2.52994L15.06 9.99994C14.91 10.1499 14.72 10.2199 14.53 10.2199Z" fill="#292D32" />
                                    </Svg>

                                )}
                            </Svg>
                        </Pressable>

                    </View>
                    <Text>
                        تکرار رمز عبور جدید
                    </Text>
                    <View style={styles.inputContainer} >
                        <TextInput
                            style={styles.password}
                            placeholder={""}
                            secureTextEntry={!showRetypePassword}
                            value={retypePassword}
                            onChangeText={RetypePassword}
                        />
                        <Pressable onPress={toggleRetypePasswordVisibility} style={styles.icon}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {showRetypePassword ? (
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M12 16.3299C9.61004 16.3299 7.67004 14.3899 7.67004 11.9999C7.67004 9.60992 9.61004 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17004 10.4399 9.17004 11.9999C9.17004 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" fill="#292D32" />
                                        <Path d="M12 21.02C8.23996 21.02 4.68996 18.82 2.24996 15C1.18996 13.35 1.18996 10.66 2.24996 8.99998C4.69996 5.17998 8.24996 2.97998 12 2.97998C15.75 2.97998 19.3 5.17998 21.74 8.99998C22.8 10.65 22.8 13.34 21.74 15C19.3 18.82 15.75 21.02 12 21.02ZM12 4.47998C8.76996 4.47998 5.67996 6.41998 3.51996 9.80998C2.76996 10.98 2.76996 13.02 3.51996 14.19C5.67996 17.58 8.76996 19.52 12 19.52C15.23 19.52 18.32 17.58 20.48 14.19C21.23 13.02 21.23 10.98 20.48 9.80998C18.32 6.41998 15.23 4.47998 12 4.47998Z" fill="#292D32" />
                                    </Svg>


                                ) : (
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.47004 15.2799C9.28004 15.2799 9.09004 15.2099 8.94004 15.0599C8.12004 14.2399 7.67004 13.1499 7.67004 11.9999C7.67004 9.60992 9.61004 7.66992 12 7.66992C13.15 7.66992 14.24 8.11992 15.06 8.93992C15.2 9.07992 15.28 9.26992 15.28 9.46992C15.28 9.66992 15.2 9.85992 15.06 9.99992L10 15.0599C9.85004 15.2099 9.66004 15.2799 9.47004 15.2799ZM12 9.16992C10.44 9.16992 9.17004 10.4399 9.17004 11.9999C9.17004 12.4999 9.30004 12.9799 9.54004 13.3999L13.4 9.53992C12.98 9.29992 12.5 9.16992 12 9.16992Z" fill="#292D32" />
                                        <Path d="M5.59997 18.51C5.42997 18.51 5.24997 18.45 5.10997 18.33C4.03997 17.42 3.07997 16.3 2.25997 15C1.19997 13.35 1.19997 10.66 2.25997 8.99998C4.69997 5.17998 8.24997 2.97998 12 2.97998C14.2 2.97998 16.37 3.73998 18.27 5.16998C18.6 5.41998 18.67 5.88998 18.42 6.21998C18.17 6.54998 17.7 6.61998 17.37 6.36998C15.73 5.12998 13.87 4.47998 12 4.47998C8.76997 4.47998 5.67997 6.41998 3.51997 9.80998C2.76997 10.98 2.76997 13.02 3.51997 14.19C4.26997 15.36 5.12997 16.37 6.07997 17.19C6.38997 17.46 6.42997 17.93 6.15997 18.25C6.01997 18.42 5.80997 18.51 5.59997 18.51Z" fill="#292D32" />
                                        <Path d="M11.9999 21.02C10.6699 21.02 9.36994 20.75 8.11994 20.22C7.73994 20.06 7.55994 19.62 7.71994 19.24C7.87994 18.86 8.31994 18.68 8.69994 18.84C9.75994 19.29 10.8699 19.52 11.9899 19.52C15.2199 19.52 18.3099 17.58 20.4699 14.19C21.2199 13.02 21.2199 10.98 20.4699 9.81C20.1599 9.32 19.8199 8.85 19.4599 8.41C19.1999 8.09 19.2499 7.62 19.5699 7.35C19.8899 7.09 20.3599 7.13 20.6299 7.46C21.0199 7.94 21.3999 8.46 21.7399 9C22.7999 10.65 22.7999 13.34 21.7399 15C19.2999 18.82 15.7499 21.02 11.9999 21.02Z" fill="#292D32" />
                                        <Path d="M12.69 16.2701C12.34 16.2701 12.02 16.0201 11.95 15.6601C11.87 15.2501 12.14 14.8601 12.55 14.7901C13.65 14.5901 14.57 13.6701 14.77 12.5701C14.85 12.1601 15.24 11.9001 15.65 11.9701C16.06 12.0501 16.33 12.4401 16.25 12.8501C15.93 14.5801 14.55 15.9501 12.83 16.2701C12.78 16.2601 12.74 16.2701 12.69 16.2701Z" fill="#292D32" />
                                        <Path d="M1.99994 22.75C1.80994 22.75 1.61994 22.68 1.46994 22.53C1.17994 22.24 1.17994 21.76 1.46994 21.47L8.93994 14C9.22994 13.71 9.70994 13.71 9.99994 14C10.2899 14.29 10.2899 14.77 9.99994 15.06L2.52994 22.53C2.37994 22.68 2.18994 22.75 1.99994 22.75Z" fill="#292D32" />
                                        <Path d="M14.53 10.2199C14.34 10.2199 14.15 10.1499 14 9.99994C13.71 9.70994 13.71 9.22994 14 8.93994L21.47 1.46994C21.76 1.17994 22.24 1.17994 22.53 1.46994C22.82 1.75994 22.82 2.23994 22.53 2.52994L15.06 9.99994C14.91 10.1499 14.72 10.2199 14.53 10.2199Z" fill="#292D32" />
                                    </Svg>

                                )}
                            </Svg>
                        </Pressable>

                    </View>
                    {formError && (
                        <View style={styles.errorContainer}>
                            <Icon name="error" width={16} height={16} fill="red" />
                            <Text style={styles.errorText}>{formError}</Text>
                        </View>
                    )}

                    <Text style={styles.textMassage}>
                        رمز عبور باید حداقل ۸ کاراکتر و شامل حروف انگلیسی کوچک و بزرگ باشد
                    </Text>
                    <Pressable style={styles.btnLogin} onPress={LoginWithPass}  >
                        <Text style={styles.btnText} color="#fff">
                            تایید و ادامه
                        </Text>
                    </Pressable>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        marginLeft: 5,
        color: 'red',
        fontSize: 10,

    },
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
        // width: "100%"
        // paddingHorizontal: 10,
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
    },
    informText: {
        fontSize: 10,
        marginBottom: 16,
        paddingRight: 4

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
    },
    btnText: {
        color: "#fff",
    },
    backText: {
        flexDirection: 'row',
        color: '#24CAA1',
        paddingLeft: 12,
    },
    codeTimeRemaining: {
        fontSize: 12,
        color: "#757575",
        textAlign: "center",
        paddingTop: 24,
        paddingBottom: 24,
    },
    resendCodeText: {
        color: "#2F89F5",
        textAlign: "center",
        paddingTop: 24,
        paddingBottom: 24,

    },
    textMassage: {
        fontSize: 12,
        marginTop: 16,
    }

});

export default ForgetPassword;
