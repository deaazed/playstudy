import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TopBarCustom from '../components/TopBarCustom';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ParameterPage: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <TopBarCustom title="Paramètres" type='dark' />
            <View style={{flex: 0.9, paddingHorizontal: 20}}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profil</Text>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Modifier mon profil</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Choix de la langue</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Paramètres avancés</Text>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Mode sombre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Notifications</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Mode de paiement</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Son et volume</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Politique de confidentialité</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Text style={styles.optionText}>Déconnexion</Text>
                        <Entypo name="chevron-right" size={20} color="#000" style={styles.chevron} />
                    </TouchableOpacity>
                </View>
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
        padding: 0,
        margin: 0
    },
    section: {
        width: "100%",
        padding: 20,
        marginVertical: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#cecece',
        borderRadius: 10,
    },
    sectionTitle: {
        fontFamily: 'PopinsRegular',
        fontSize: 14,
        color: "#898A8D",
        marginBottom: 10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        paddingVertical: 10
    },
    optionText: {
        fontFamily: 'PopinsMedium',
        fontSize: 16,
        color: "#263238",
        marginLeft: 10,
        width: '80%'
    },
    chevron: {
        marginLeft: 'auto'
    }
});

export default ParameterPage;