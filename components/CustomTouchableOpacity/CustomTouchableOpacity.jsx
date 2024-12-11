import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomTouchableOpacity = ({ onPress, children, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6} // Set the active opacity to 0.7
            style={[styles.button, style]}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

export default CustomTouchableOpacity;
