import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('userToken');
            navigation.navigate('Login'); // Assuming 'Login' is the name of your login screen
        } catch (err) {
            console.error('Error logging out', err);
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {

                const storedToken = await SecureStore.getItemAsync('token');
                if (storedToken) {
                    console.log('Token:', storedToken);
                    setToken(storedToken);
                } else {
                    setError('No token found');
                }
            } catch (err) {
                setError('Failed to fetch token');
                console.error('Error fetching token', err);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tokenText}>Token: {token}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    tokenText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profile;
