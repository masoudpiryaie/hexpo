import React from 'react';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';

const FontWrapper = ({ children, font, style }) => {
    const [loaded] = useFonts({
        CustomFont: require('../../assets/fonts/IRANSansWeb.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <Text style={[{ fontFamily: font }, style]}>
            {children}
        </Text>
    );
};

export default FontWrapper;