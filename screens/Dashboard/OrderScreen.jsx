import { View, Text, StyleSheet, Button } from "react-native"
import ReportScreen from './ReportScreen'

const OrderScreen = () => {
    return (
        <View>
            <Text style={styles.text}>
                سفارش‌ها
            </Text>
            <Button
                title="go to next page"
                onPress={() => navigation.navigate('ReportScreen')}
            >

            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'IRANSansWeb',

    }
})
export default OrderScreen;