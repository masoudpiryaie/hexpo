import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native';
import Icon from '../../components/Icon/Icon';
import AccountPersonalInfo from './MyAccount/AccountPersonalInfo';
import AccountContactInfo from './MyAccount/AccountContactInfo';
import AccountShopInfo from './MyAccount/AccountShopInfo';
import AccountBankInfo from './MyAccount/AccountBankInfo';


const MyAccount = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);



    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const sortShopList = (sortingOption) => {
        setSelectedOption(sortingOption);
        toggleModal(); // Close the modal after sorting
    };


    const openDataForm = (section) => {
        if (selectedSection === section) {
            // If the selected section is clicked again, toggle it to close
            setSelectedSection(null);
        } else {
            setSelectedSection(section);
        }
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Text style={styles.text}>
                        اطلاعات حساب کاربری
                    </Text>

                </View>
                <View style={styles.shopContainer}>
                    <Pressable
                        style={[
                            styles.accountListContainer,
                            selectedSection === 'personalInfo' && styles.selectedAccountListContainer
                        ]}
                        onPress={() => openDataForm('personalInfo')}
                    >
                        <Text
                            style={[styles.shopList,
                            selectedSection === 'personalInfo' && styles.selectedShopList
                            ]}>
                            اطلاعات شخصی
                        </Text>
                    </Pressable>
                    {selectedSection === 'personalInfo' && <AccountPersonalInfo />}

                    <Pressable
                        style={[
                            styles.accountListContainer,
                            selectedSection === 'contactInfo' && styles.selectedAccountListContainer
                        ]}
                        onPress={() => {
                            openDataForm('contactInfo')
                            console.log("selectedSection", selectedSection)
                        }}
                    >
                        <Text
                            style={[styles.shopList,
                            selectedSection === 'contactInfo' && styles.selectedShopList
                            ]}>
                            اطلاعات تماس و آدرس
                        </Text>
                    </Pressable>
                    {selectedSection === 'contactInfo' && <AccountContactInfo />}

                    <Pressable
                        style={[
                            styles.accountListContainer,
                            selectedSection === 'shopInfo' && styles.selectedAccountListContainer
                        ]}

                        onPress={() => {
                            openDataForm('shopInfo')
                            console.log("selectedSection", selectedSection)
                        }}
                    >
                        <Text
                            style={[styles.shopList,
                            selectedSection === 'shopInfo' && styles.selectedShopList
                            ]}>
                            اطلاعات فروشگاه
                        </Text>
                    </Pressable>
                    {selectedSection === 'shopInfo' && <AccountShopInfo />}

                    <Pressable
                        style={[
                            styles.accountListContainer,
                            selectedSection === 'bankInfo' && styles.selectedAccountListContainer
                        ]}
                        onPress={() => openDataForm('bankInfo')}
                    >
                        <Text
                            style={[styles.shopList,
                            selectedSection === 'bankInfo' && styles.selectedShopList
                            ]}>
                            اطلاعات حساب بانکی
                        </Text>
                    </Pressable>
                    {selectedSection === 'bankInfo' && <AccountBankInfo />}
                </View>
            </View>


        </ScrollView >

    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        paddingTop: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "90%",
        marginBottom: 80,
    },
    text: {
        fontFamily: 'IRANSansWeb',
        paddingRight: 10,
    }
    ,
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyitems: 'center',
        height: 50,
    },
    shopContainer: {
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyitems: 'center',
    },
    accountListContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: "85%",
        height: 58,
        backgroundColor: '#f3f3f3',
        marginVertical: 8,
        borderRadius: 8,
    },
    selectedAccountListContainer: {
        backgroundColor: '#e2faf4',
        color: '#fff',
    },
    shopList: {
        fontFamily: 'IRANSansWeb',
        color: "#757575",
        textAlign: 'center',
    },
    selectedShopList: {
        color: "#24caa1",
    },
    sortingOption: {
        flexDirection: "row",
        alignItems: "center",
    },
});
export default MyAccount;