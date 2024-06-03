import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

interface TopBarCustomProps {
    title: string;
    type?: 'dark' | 'light';
    rightButton?: React.ReactNode;
}

const TopBarCustom: React.FC<TopBarCustomProps> = ({ title, type = 'light', rightButton }) => {
    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Ajoutez ici la logique pour afficher le menu
    };

    return (
        <View style={styles.topBar}>
            <Pressable onPress={handleBackPress} style={styles.button}>
                <Entypo name="chevron-thin-left" color="#263238" size={20} />
            </Pressable>
            <Text style={[styles.title, { color: type == 'light' ? "#fff" : '#263238' }]}>{title}</Text>
            {rightButton}
            {!rightButton &&
                <Pressable onPress={handleMenuPress} style={styles.button}>
                    <Entypo name="dots-three-vertical" color="#263238" size={20} />
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        paddingTop: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PopinsRegular'
    },
});

export default TopBarCustom;