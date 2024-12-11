import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import { useUserContext } from '../../services/AuthContext/AuthContext';

const GardeshWallet = () => {
    const [selectedOption, setSelectedOption] = useState('allShop');
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'واریزی', price: '500,000', cardNumber: '13553912121655889924722', date: '1402/07/01', txnNumber: '001' },
        { id: 2, type: 'برداشت', price: '200,000', cardNumber: '13553912121655889924722', date: '1402/07/02', txnNumber: '002' },
        { id: 1, type: 'واریزی', price: '500,000', cardNumber: '13553912121655889924722', date: '1402/07/01', txnNumber: '001' },
    ]);

    const sortShopList = (sortingOption) => {
        setSelectedOption(sortingOption);
        // Implement sorting logic here if needed
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <BackButton route="Wallet" label="کیف پول" />
            <View style={styles.formContainer}>
                {/* Selected Option Row */}
                <View style={styles.selectedOptionContainer}>

                    <Pressable
                        onPress={() => sortShopList('status1')}
                        style={[
                            styles.sortingOption,
                            selectedOption === 'status1' && styles.selectedBorder
                        ]}
                    >
                        <Text style={styles.sortOptionText}>هزینه کرد از کیف پول</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => sortShopList('allShop')}
                        style={[
                            styles.sortingOption,
                            selectedOption === 'allShop' && styles.selectedBorder
                        ]}
                    >
                        <Text style={styles.sortOptionText}>واریزی/برداشتی</Text>
                    </Pressable>
                </View>

                {/* Transaction List */}
                <View style={styles.transactionList}>
                    {transactions.filter(txn => txn.type === selectedOption || selectedOption === 'allShop').map(transaction => (
                        <View key={transaction.id} style={styles.transactionCard}>
                            <View
                                style={[
                                    styles.textHeader,
                                    { backgroundColor: transaction.type === 'واریزی' ? '#e4f9f1' : transaction.type === 'برداشت' ? '#fbe7e9' : '#323232' }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.transactionText,
                                        { color: transaction.type === 'واریزی' ? '#24CAA1' : transaction.type === 'برداشت' ? '#FF0000' : '#323232' }
                                    ]}
                                >
                                    {transaction.type}
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.transactionText}>{transaction.price} تومان</Text>
                                <Text style={styles.transactionText}>مبلغ: </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.transactionText, { color: '#2F89F5' }]}>{transaction.cardNumber}</Text>
                                <Text style={styles.transactionText}>شماره کارت: </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.transactionText}>{transaction.date}</Text>
                                <Text style={styles.transactionText}>تاریخ: </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.transactionText}>{transaction.txnNumber}</Text>
                                <Text style={styles.transactionText}>شماره تراکنش: </Text>
                            </View>
                        </View>


                    ))}
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingTop: 18,
        paddingBottom: 10,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '92%',
        // paddingHorizontal: 24,
        paddingVertical: 20,
        marginBottom: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    selectedOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    sortingOption: {
        paddingBottom: 10,
        paddingHorizontal: 12,
        borderColor: '#24CAA1',
    },
    selectedBorder: {
        borderBottomWidth: 3,
        borderColor: '#24CAA1',
    },
    sortOptionText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'IRANSansWeb',
    },
    transactionList: {
        width: '100%',
    },
    textHeader: {
        // backgroundColor: '#e4f9f1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        margin: 'auto',
        color: '#24caa1',
        // marginVertical: 5,

    },
    // justifyContent: 'center',
    transactionCard: {
        // backgroundColor: '#f1f1f1',
        borderRadius: 1,
        padding: 25,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        paddingBottom: 50,
        marginVertical: 5,
        // borderBottomColor: '#'
    },
    transactionText: {
        fontFamily: 'IRANSansWeb',
        fontSize: 14,
        color: '#333',
        paddingVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        alignItems: 'center',
    },
    transactionDateValue: {
        fontFamily: 'IRANSansWeb',
        fontSize: 14,
        color: '#333',
        paddingLeft: 8, // Adjust this value for more or less space
    },
});

export default GardeshWallet;


// export default GardeshWallet;
