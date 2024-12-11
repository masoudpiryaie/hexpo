import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Icon from '../Icon/Icon';

const Header = ({ onMenuPress }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open/close
    const openMenuDrawer = () => {
        setDrawerOpen(!isDrawerOpen)
    };


    return (
        <View style={styles.menuWrapper}>
            <Pressable onPress={onMenuPress}>
                <Icon name="menu" width={24} height={24} />
            </Pressable>
            <Text>hamiket</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    menuWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        // height: 200,
    }
})
export default Header;
