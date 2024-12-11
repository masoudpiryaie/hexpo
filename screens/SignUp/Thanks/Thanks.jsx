import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
// import Dashboard from '../../Dashboard';
// import LoginWithMobile from '../../Login/Login';
const localImage = require('../../../assets/Asset1-10.png');

const Thanks = () => {
    const [backToHome, setBackToHome] = useState(false)
    const handleBack = () => {
        setBackToHome(true)
    }
    return (
        <View>
            <View style={styles.signUpForm}>
                <Text style={styles.textBox}>
                    با سپاس از حسن اعتماد شما فروشنده گرامی، درخواست ثبت نام شما برای تیم حامی‌کت ارسال گردید و پس از بررسی، نتیجه از طریق پیامک و ایمیل به شما اعلام خواهد شد.
                    لطفا صبور باشید
                </Text>
                {/* Use the localImage variable as the source */}
                <Image source={localImage} style={styles.images} />
                <Pressable style={styles.btn} onPress={handleBack}>
                    <Text style={styles.btnText}>
                        بازگشت به حامی‌کت
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    signUpForm: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',

        padding: 24,
        borderRadius: 12,
        marginTop: 80,

    },
    textBox: {
        flex: 1,
        color: '#24caa1',
        backgroundColor: '#e2faf4',
        fontSize: 16,
        borderWidth: 1.6,
        borderRadius: 12,
        borderColor: '#24caa1',

        padding: 16,
        height: 177,
        textAlign: 'justify',
    },
    images: {

        width: 180,
        height: 184,
        marginTop: 32,
        resizeMode: 'contain', // Adjust the resizeMode as needed
    },
    btn: {
        backgroundColor: '#e5f0fe',
        padding: 50,
        marginTop: 64,
        borderRadius: 8,
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
    },
    btnText: {
        color: '#2F89F5'
    }
})
export default Thanks;