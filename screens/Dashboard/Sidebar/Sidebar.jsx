import React from "react";
import { View, Text, StyleSheet } from "react-native"

const Sidebar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logo_name}>لوگو</Text>
            </View>
            <Text style={{ fontFamily: 'IRANSansWeb' }}>پنل فروشنده حامی کت</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    logo: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    logo_name: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black", fontFamily: 'IRANSansWeb'
    },
    vendorPanelTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        fontFamily: 'IRANSansWeb',
    },
})

export default Sidebar;