import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';

const IdCardInfo = () => {
    const { ispersonal, setIspersonal } = useFormData();
    const [frontPhoto, setFrontPhoto] = useState(null);
    const [backPhoto, setBackPhoto] = useState(null);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: mediaStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
            // Handle permissions not granted
            console.log('Permissions not granted');
        }
    };

    const handleFrontPhotoUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            // Permission not granted, handle accordingly
            console.log('Permission not granted');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            // Image picked, handle the result
            setFrontPhoto(result.uri);
        }
    };

    const handleBackPhotoUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            // Permission not granted, handle accordingly
            console.log('Permission not granted');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            // Image picked, handle the result
            setBackPhoto(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.signUpForm}>
                <Text style={styles.btnInfo}>
                    بارگذاری مدارک
                </Text>

                <Text style={{ fontFamily: 'IRANSansWeb' }}>مدارک فروشنده</Text>
                {frontPhoto && <Image source={{ uri: frontPhoto }} style={{ width: 100, height: 100 }} />}
                <TouchableOpacity style={styles.uploadBox} onPress={handleFrontPhotoUpload}>
                    <View style={styles.textInsideTouchableOpacity}>
                        <Text style={{ fontFamily: 'IRANSansWeb' }}>تصویر جلو</Text>
                    </View>
                </TouchableOpacity>

                {backPhoto && <Image source={{ uri: backPhoto }} style={{ width: 100, height: 100 }} />}
                <TouchableOpacity style={styles.uploadBox} onPress={handleBackPhotoUpload}>
                    <View style={styles.textInsideTouchableOpacity}>
                        <Text style={{ fontFamily: 'IRANSansWeb' }} >تصویر پشت</Text>
                    </View>
                </TouchableOpacity>

                {!ispersonal && (
                    <TouchableOpacity style={styles.uploadBox} onPress={handleFrontPhotoUpload}>
                        <View style={styles.textInsideTouchableOpacity}>
                            <Text style={{ fontFamily: 'IRANSansWeb' }}>تصویر جلو</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    signUpForm: {
        backgroundColor: "#fff",
        padding: 24,
        width: 328,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 40,
    },

    uploadBox: {
        width: 280,
        borderColor: '#CBCBCB',
        borderWidth: 1,
        height: 112,
        borderRadius: 8,
        marginTop: 16,
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
    textInsideTouchableOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'IRANSansWeb',
    },

});

export default IdCardInfo;