import { View, Text, StyleSheet } from "react-native"

const ReportScreen = () => {
    return (
        <View>
            <Text style={styles.text}>
                گزارش‌ها
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'IRANSansWeb',

    }
})
export default ReportScreen;