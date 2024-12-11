import { Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Button, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect, Children } from 'react'
import Icon from '../Icon/Icon'
import Modal from "react-native-modal";
// import Modal from ''

const CustomDrawer = ({ isVisibles, onClose, children, modalHeight }) => {
    const defaultModalHeight = '66%';
    const [slideAnim] = useState(new Animated.Value(-300)); // Initial position is outside the screen
    // const [close, setClose] = useState(isVisibles)

    // const closeModal = () => {
    //     setClose(!close)
    // }
    return (
        // <SafeAreaView>
        <Modal
            isVisible={isVisibles}
            animationIn="slideInRight"
            // animationOut="slidOutRight"
            // animationType=''
            // animationType="slide"

            // transparent={true}
            // visible={isVisible} // Use isVisible prop to control modal visibility
            // onRequestClose={onClose} // Handle modal close request
            // style={styles.modal}
            // isVisible={isVisibles}
            onRequestClose={onClose}
            // animationIn='slideInRight'
            // animationOut='slidOutRight'
            onClose={onClose} // Handle modal close request
            // scrollOffset={0}

            style={{ margin: 0, width: '80%' }}
            // animationInTiming={1000}

            // onBackButtonPress={}
            onBackdropPress={onClose}
        // backdropOpacity='0.3'

        >

            <View style={{ backgroundColor: '#fff', height: '100%' }}>


                <Pressable style={styles.closeIcon} onPress={onClose}>
                    <Icon name='closeSquare' width={24} height={24} />
                </Pressable>

                <ScrollView>

                    {children}
                </ScrollView>

            </View>
        </Modal >
        // </SafeAreaView >
    );

};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    closeIcon: {
        margin: 20,
    },

})

export default CustomDrawer;