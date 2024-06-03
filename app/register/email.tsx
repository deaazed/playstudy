import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useUsers } from '../../components/UsersContext';
import { router } from 'expo-router';
import TopBarCustom from '../../components/TopBarCustom';


const EmailScreen = () => {
    const [email, setEmail] = useState('');
    const {state, dispatch} = useUsers();

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if(text.length > 0) {
            const user = { email: text };
            const currentUser = state.user;   
            dispatch({ type: "USER_FETCH", payload: Object.assign(currentUser, user) });
        }        
    };
    const handleSubmit = () => {
        router.push("/register/pass")
    };

    return (
        <View style={styles.container}>
            <TopBarCustom title='' rightButton={<></>}/>
            <View style={{ flex: 1, width: '100%'}}>
                <Text style={styles.title}>Saisis ton mail </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        onChangeText={handleEmailChange}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.buttomView}>
                <TouchableOpacity style={[styles.nextButton, { backgroundColor: email === '' ? '#cecece' : '#3444F1' } ]} disabled={email === ''} onPress={() => handleSubmit()}>
                    <Text style={styles.nextButtonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontFamily: 'PopinsMedium',
        textAlign: 'center',
        marginVertical: 20,
        flex: 0.1,
    },
    buttomView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 100
    },
    nextButton: {
        padding: 20,
        alignItems: 'center',
        width: 300,
        borderRadius: 26,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(60, 60, 67, 0.6)',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        height: 45,
        width: '100%'
    },
});

export default EmailScreen;