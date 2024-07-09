import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import Awards from './Awards';

interface TopBarCustomProps {
    title: string;
    type?: 'dark' | 'light';
    progress?: number;
    color?: string;
}

const TopBarGames: React.FC<TopBarCustomProps> = ({ title, type = 'light', progress, color }) => {
    const handleBackPress = () => {
        router.back();
    };

    const generateProgress = () => {
        let progressArray = [];
        for (let i = 0; i < 10; i++) {
            console.log(progress && i < progress ? color : '#dededede');
            progressArray.push(
                <View key={i} style={{width: 25, height: 5, borderRadius: 5, backgroundColor: progress && i < progress ? color : '#dededede'}}/>
            );
        }
        return progressArray;
    }

    return (
        <View style={styles.topBar}>
            <View style={{flexDirection: 'column', gap: 30, width: '100%'}}>
                <Awards markEdges={type == 'light'}/>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <Pressable onPress={handleBackPress} style={styles.button}>
                        <Entypo name="cross" color="#263238" size={40} />
                    </Pressable>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal : 20}}>
                        <Text style={[styles.title, { color: type !== 'light' ? "#fff" : '#263238' }]}>{title}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 2, width: '100%'}}>
                            {generateProgress()}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        padding: 5,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PopinsRegular'
    },
});

export default TopBarGames;