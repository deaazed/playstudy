import { View, Text, StyleSheet, Modal as ReactModal, Pressable } from 'react-native';
import React from 'react'

export interface ModalProps {
    text: { title: string, content: string , validate: string, cancel: string };
    callback: (() => void)[];
    status: boolean;
}

export const Modal: React.FC<ModalProps> = ({ text, callback, status }) => {
    return (
        <ReactModal animationType="fade" transparent={true} visible={status}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{text.title}</Text>
                    <Text style={styles.modalText}>
                        {text.content}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 10, backgroundColor: '#fff' }}>
                        <Pressable style={[styles.button, styles.buttonValidate]} onPress={callback[0]}>
                            <Text style={styles.textStyle}>{text.validate}</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={callback[1]}>
                            <Text style={styles.textStyle}>{text.cancel}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ReactModal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        width: 100,
        padding: 10,
    },
    buttonValidate: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});