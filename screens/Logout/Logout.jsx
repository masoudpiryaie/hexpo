import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../services/AuthContext/AuthContext';
import LoginWithMobile from '../Login';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator, Pressable, Image, Button } from 'react-native';

const Logout = () => {
    const { logout } = useUserContext();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    // useEffect(() => {

    //     logout();

    // }, []);

    return logout()
}

export default Logout;
