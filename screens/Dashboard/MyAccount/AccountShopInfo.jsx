import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import Icon from '../../../components/Icon/Icon';
import { useFormData } from '../../../services/FormDataContext/FormDataContext';
import Page from './pages/Page';

const AccountShopInfo = () => {
    const { shopData } = useFormData();
    const [error, setError] = useState(null);
    const [shopPages, setShopPages] = useState({});
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NzY2NTg4LCJleHAiOjE3MTU4NTI5ODh9.yMEF962WFussIgb4eAZTQ4I0WhcMvnSMRbYFjjygr98"
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchCategoryData = async () => {
        try {
            const response = await axios.post(BASE_URL + '/category/get', {});
            setCategoryData(response.data.data);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const nextPage = (shopId) => {
        setShopPages(prevState => ({
            ...prevState,
            [shopId]: (prevState[shopId] || 1) + 1
        }));
    };

    const prevPage = (shopId) => {
        setShopPages(prevState => ({
            ...prevState,
            [shopId]: Math.max((prevState[shopId] || 1) - 1, 1)
        }));
    };

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View>
            <Pressable style={styles.shopNameBox}>
                <Text style={styles.shopNameText}>{shopData.economic_name}</Text>
                <Icon name='arrowDownBold' width={24} height={24} fill="red" />
            </Pressable>
            <View style={styles.formContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Page
                        key={index}
                        shopId={shopData.id}
                        pageNumber={index + 1}
                        currentPage={shopPages[shopData.id] || 1}
                        nextPage={() => nextPage(shopData.id)}
                        prevPage={() => prevPage(shopData.id)}
                        categoryData={categoryData}
                    />
                ))}
                {/* Add your bottom content here */}
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>ثبت تغییرات</Text>
                </View>
                {/* Next and Prev buttons */}
                <View style={styles.navigation}>
                    {shopPages[shopData.id] !== 5 && (
                        <View style={styles.navigation}>
                            <Pressable style={styles.inlineNavigationButton} onPress={() => nextPage(shopData.id)}>
                                <Icon name='arrowRight' width={24} height={24} fill='#24CAA1'></Icon>
                                <Text style={styles.navigationText}>بعدی</Text>
                            </Pressable>
                        </View>
                    )}
                    {shopPages[shopData.id] !== 1 && (
                        <View style={styles.navigation}>
                            <Pressable style={styles.inlineNavigationButton} onPress={() => prevPage(shopData.id)}>
                                <Text style={styles.navigationText}>قبلی</Text>
                                <Icon name='arrowLeft' width={24} height={24} fill='#24CAA1' />
                            </Pressable>
                        </View>
                    )}
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shopNameBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#24CAA1",
        borderRadius: 10,
        width: '84%',
        marginVertical: 16,
    },
    shopNameText: {
        color: '#24CAA1',
        fontFamily: 'IRANSansWeb',
    },
    bottomContainer: {
        marginTop: 48,
        padding: 12,
        backgroundColor: '#24CAA1',
        borderRadius: 8,
        marginVertical: 16,


    },
    bottomText: {
        textAlign: 'center',
        // fontSize: 16,
        // fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'IRANSansWeb',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inlineNavigationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    navigationText: {
        color: '#24CAA1',
        fontFamily: 'IRANSansWeb',
        padding: 3
    },
});

export default AccountShopInfo;
