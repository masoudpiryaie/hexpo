import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Modal, Portal } from 'react-native-paper';

const Alert = ({ visible, onClose, type = 'success', message }) => {

    // Define different styles for success, error, and warning alerts
    const getAlertStyles = () => {
        switch (type) {
            case 'error':
                return {
                    borderColor: 'border-red-500',
                    textColor: 'text-red-500',
                };
            case 'warning':
                return {
                    borderColor: 'border-yellow-500',
                    textColor: 'text-yellow-500',
                };
            case 'success':
            default:
                return {
                    borderColor: 'border-green-500',
                    textColor: 'text-green-500',
                };
        }
    };

    const alertStyles = getAlertStyles();

    return (
        <Modal
            visible={visible}
            onDismiss={onClose}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: 300,
                height: 180,
                alignSelf: 'center',
                borderRadius: 10, // Adds some rounded corners
            }}
        >
            <View className={`border ${alertStyles.borderColor} rounded-lg p-4`}>
                <Text className={`${alertStyles.textColor} text-lg font-semibold mb-2`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <Text className="text-gray-700 mb-4">
                    {message}
                </Text>
                <TouchableOpacity
                    onPress={onClose}
                    className="self-end border border-green-500 rounded-8 p-2">
                    <Text className="text-green-500">بستن</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default Alert;
