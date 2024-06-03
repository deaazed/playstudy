import { View as DefaultView, Text, StyleSheet } from 'react-native'
import Amico from '../../assets/images/amico.svg'
import { Link } from 'expo-router';
import React from 'react';

export default function register() {
  return (
    <DefaultView style={styles.container}>
        <DefaultView style={styles.upperPart}>
            <Amico />
        </DefaultView>
        <DefaultView style={styles.text}>
            <Text style={{ fontSize: 33 }}>Il est temps de créer </Text><Text style={{ fontSize: 33, fontWeight: 'bold'}}>votre profil</Text>
            <Text style={{ fontSize: 15, paddingHorizontal: 70, paddingVertical: 30, color: '#989EA7' }}>Créez un profil pour enregistrer vos progrès d'apprentissage et continuer à apprendre gratuitement.</Text>
        </DefaultView>
        <DefaultView style={styles.containerBtns}>
            <Link href='/' style={styles.buttonBack}>
                <Text style={{color: '#989EA7'}}>Retour</Text>
            </Link>
            <Link href="/register/avatar" style={styles.register}>
                <Text style={{color: '#fff'}} >S'inscrire</Text>
            </Link>
        </DefaultView>
    </DefaultView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    upperPart: { 
        backgroundColor: '#8CCEF9',
        flex: 0.6,
        width: '150%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 370,
        borderBottomRightRadius: 225
    },
    text: {
        flex: 0.2,
        alignItems: 'center',
        marginTop: 30
    },
    register: {
        borderRadius: 26.5, 
        backgroundColor: '#3444F1',
        width: 134, 
        height: 56,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    buttonBack: {
        borderRadius: 26.5,
        borderWidth: 2,
        borderColor: '#989EA7',
        width: 134, 
        height: 56,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    containerBtns: {
        justifyContent: 'space-between',
        position: 'absolute',
        gap: 33,
        bottom: 50,
        display: 'flex',
        flexDirection: 'row'
    }
});