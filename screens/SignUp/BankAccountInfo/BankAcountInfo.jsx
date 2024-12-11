import React from 'react';
import { useState, useRef } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';


const BankAccountInfo = () => {
    const { formData, updateFormData } = useFormData();

    const handleChange = (name, value) => {
        updateFormData('bankAccountInfo', { [name]: value });
        console.log(name, value);

    };

    return (
        <View style={styles.container}>

            <View style={styles.signUpForm}>
                <Text style={styles.btnInfo}>
                    اطلاعات حساب بانکی
                </Text>
                <>
                    <View>
                        <Text style={styles.inputLabel}>
                            شماره شبا
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('shabaNumber', text)}
                            value={formData.bankAccountInfo.shabaNumber}
                            placeholder='IR123456789123456789123456'

                        />
                        <Text style={styles.inputLabel}>
                            شماره کارت
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('cardNumber', text)}
                            value={formData.bankAccountInfo.cardNumber}
                            placeholder='6037603760376037'
                            keyboardType="numeric"
                        />
                        <Text style={styles.inputLabel} > شماره حساب
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('bankAccountNumber', text)}
                            value={formData.bankAccountInfo.bankAccountNumber}
                            placeholder='89123456'
                            keyboardType="numeric"
                        />


                    </View>

                </>
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
    inputLabel: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',

    },
})

export default BankAccountInfo;