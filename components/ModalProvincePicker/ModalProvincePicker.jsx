import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';

const ModalProvincePicker = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal} />
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
                animationInTiming={2000} // Adjust the timing as needed
                animationOutTiming={2000} // Adjust the timing as needed
                style={styles.modal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.container}>


                            {step < 5 && (



                                <Pressable
                                    style={[styles.container, styles.stickyBtn]}
                                    onPress={handleNext}
                                    disabled={step > 5}
                                >
                                    <Text style={styles.nextBtn} color="#fff">
                                        تایید و ادامه
                                    </Text>
                                </Pressable>)}
                            {step === 5 && (
                                <View style={[styles.container, styles.stickyBtn]}>
                                    <View style={styles.inline}>
                                        <Pressable
                                            style={styles.container}
                                            onPress={handleSendUserData}
                                        >
                                            <Text style={styles.nextBtnEnd} color="#fff">
                                                ارسال درخواست
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.container, styles.stickyBtn]}
                                            onPress={handleBack}
                                        >
                                            <Text style={styles.prevBtn} color="#fff">
                                                بازگشت
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>

                            )
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end', // Aligns modal to the bottom
        alignItems: 'center',

    },
    modalView: {
        padding: 20,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        width: '100%',
        height: '10%',
        position: 'absolute',
        bottom: 0, // Updated to align with the bottom
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
});

export default ModalProvincePicker;