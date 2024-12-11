// BackButton.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import CustomTouchableOpacity from '../components/CustomTouchableOpacity/CustomTouchableOpacity';
// import Icon from '../components/Icon/Icon';
import CustomTouchableOpacity from '../CustomTouchableOpacity/CustomTouchableOpacity';
import Icon from '../Icon/Icon';
// import { Icon } from 'react-native-paper';

const BackButton = ({ route, label }) => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate(route);
    };

    return (
        <CustomTouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name='arrowRight' width={24} height={24} fill="#757575" />
            <Text style={styles.backButtonText}>{label}</Text>
        </CustomTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16, // Adjust margin as needed
        justifyContent: 'right',
    },
    backButtonText: {
        color: '#323232',
        fontSize: 17,
        marginLeft: 8,
        fontFamily: 'IRANSansWeb', // Adjust to your font
    },
});

export default BackButton;
