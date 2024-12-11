import React from 'react';
import { useState, useRef } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';

const ContactInfo = () => {

    const { formData, updateFormData } = useFormData();

    const handleChange = (name, value) => {
        updateFormData('contactInfo', { [name]: value });
        console.log(name);

    };
    if (!formData) {
        return <Text>loading ...</Text>
    }
    return (
        <View style={styles.container}>

            <View style={styles.signUpForm}>
                <Text style={styles.btnInfo}>
                    اطلاعات تماس و آدرس
                </Text>
                <>
                    <View>
                        <Text style={styles.inputLabel}>
                            شماره همراه
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('mobileNumber', text)}
                            placeholder='۰۹۱۲۱۲۳۴۵۶۷'
                            keyboardType="numeric"
                            value={formData.contactInfo.mobileNumber}
                        />
                        <Text style={styles.inputLabel}>
                            شماره ثابت
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('homeNumber', text)}
                            placeholder='66525448'
                            keyboardType="numeric"
                            value={formData.contactInfo.homeNumber}
                        />
                        <Text style={styles.inputLabel} >
                            ایمیل
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('email', text)}
                            placeholder='sa.salehi71@gmail.com'
                            value={formData.contactInfo.email}
                        />
                        <Text style={styles.inputLabel}> استان
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='تهران'
                            onChangeText={(text) => handleChange('province', text)}
                            value={formData.contactInfo.province}
                        />
                        <Text style={styles.inputLabel}> شهر
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='تهران'
                            onChangeText={(text) => handleChange('city', text)}
                            value={formData.contactInfo.city}
                        />
                        <Text style={styles.inputLabel}> کد پستی
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('zipCode', text)}
                            value={formData.contactInfo.zipCode}
                            keyboardType="numeric"
                            placeholder='۱۲۳۴۵۶۷۸۹۰'
                        />
                        <Text style={styles.inputLabel}> موقعیت مکانی
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('location', text)}
                            value={formData.contactInfo.location}
                            placeholder='432525222'
                        />
                        <Text style={styles.inputLabel}> آدرس
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('address', text)}
                            value={formData.contactInfo.address}
                            placeholder='تهران - خیابان آزادی - کوچه شهید صادقی - بن بست ششم'
                        />
                        <Text style={styles.inputLabel}> پلاک
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('pelak', text)}
                            value={formData.contactInfo.pelak}
                            placeholder='۲'
                        />
                        <Text style={styles.inputLabel}> واحد
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('unit', text)}
                            value={formData.contactInfo.unit}
                            placeholder='۱'
                        />
                        <Text style={styles.inputLabel}> توضیحات آدرس
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleChange('description', text)}
                            value={formData.contactInfo.description}
                            placeholder='توضیحات'
                        />
                        <Text style={styles.inputLabel}>این آدرس جهت مکاتبات اداری و غیر اداری بین حامی‌کت و شما فروشنده گرامی استفاده خواهد شد، لطفا از صحت اطلاعات وارد شده اطمینان حاصل کنید
                        </Text>
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
export default ContactInfo;