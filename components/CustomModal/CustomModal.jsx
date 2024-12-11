import { Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import Modal from "react-native-modal";


const CustomModal = ({ isVisible, onClose, children, modalHeight }) => {
    const defaultModalHeight = '66%'


    return (
        <Modal
            transparent={true}
            isVisible={isVisible}
            style={{ margin: 0, padding: 0 }}
            onBackdropPress={onClose}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity='0.3'
        // animationInTiming={1000}
        >
            {/* <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback> */}

            < View style={[styles.modalContainer1, { height: modalHeight || defaultModalHeight }]} >
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                    <Icon name='closeSquare' width={24} height={24} />
                </TouchableOpacity>
                <View>
                    {children}
                </View>
            </View >
        </Modal >
    );
};
export default CustomModal

const styles = StyleSheet.create({

    modal: {
        backgroundColor: "#757575",
        borderRadius: 8,
        borderRadius: 20,
        margin: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    closeIcon: {
        margin: 20,
    },

    modalContainer1: {
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '66%',
        width: '100%',
        position: 'absolute',
        bottom: 0,

    },
})