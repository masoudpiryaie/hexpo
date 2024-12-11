import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

const CustomInput = ({
    name,
    label,
    placeholder,
    keyboardType = 'default',
    required = false,
    value,
    onChange
}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    // Function to handle validation based on the field name
    const handleValidation = () => {
        if (required && (!inputValue || inputValue.trim().length === 0)) {
            return "این فیلد اجباری است.";
        }

        if (name === 'mobileNumber') {
            // Validate mobile number (should start with '09' and be 11 digits)
            const mobileRegex = /^09\d{9}$/;
            if (!mobileRegex.test(inputValue)) {
                return "شماره موبایل معتبر نیست.";
            }
        } else if (name === 'tel') {
            // Validate telephone number (basic length check for example)
            const telRegex = /^\d{8,10}$/;
            if (!telRegex.test(inputValue)) {
                return "شماره تلفن معتبر نیست.";
            }
        }
        return null;
    };

    // Determine if the input has an error
    const error = isTouched ? handleValidation() : null;

    return (
        <View>
            <Text style={styles.inputLabel}>{label} {required && '*'}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={inputValue}
                onChangeText={(text) => {
                    setIsTouched(true);
                    setInputValue(text);
                    onChange && onChange(text);  // Pass to parent if provided
                }}
                onBlur={() => setIsTouched(true)}  // Mark as touched when the input loses focus
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    inputLabel: {
        paddingTop: 24,
        fontSize: 14,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
    },
    input: {
        textAlign: "right",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 8,
        fontSize: 14,
        alignItems: "flex-end",
        marginTop: 8,
        fontFamily: 'IRANSansWeb',
        color: '#757575',
        alignContent: 'flex-start',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});
