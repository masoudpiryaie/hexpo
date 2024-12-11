import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function VendorLogo() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logo_name}>لوگو</Text>
            </View>
            <Text style={styles.vendorPanelTitle}>پنل فروشنده حامی کت</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        backgroundColor: "#24caa1",
        height: 100,

        width: 100,
        borderRadius: 100 / 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    logo_name: {
        fontSize: 20,
        color: "#f8f8f8",
        fontFamily: 'IRANSansWeb'
    },
    vendorPanelTitle: {
        fontSize: 20,
        fontFamily: 'IRANSansWeb'
        // fontWeight: 500,
    },
})