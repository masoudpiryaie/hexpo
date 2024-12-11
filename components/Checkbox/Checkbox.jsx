import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import your icon library

const CustomCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity
            style={[styles.checkbox, isChecked ? styles.checked : styles.unchecked]}
            onPress={toggleCheckbox}>
            {isChecked && <Ionicons name="checkmark" size={24} color="#24caa1" />}
            {/* Replace "checkmark-circle" with your custom checked icon */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: '4',
        textAlign: 'left',
    },
    checked: {
        backgroundColor: '#e2faf4',
        borderColor: '#24caa1',
    },
    unchecked: {
        backgroundColor: '#e2faf4',
        borderColor: '#24caa1',
    },
});

export default CustomCheckbox;