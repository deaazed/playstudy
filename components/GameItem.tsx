import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Progressbar from './Progressbar';
import { GameItemProps } from '../services/Interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';


const GameItem: React.FC<GameItemProps> = ({ game, onPress }) => {
    const GameImage = game.image ? { uri: game.image } : require('../assets/images/fire.png');

    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={[styles.leftInner, { backgroundColor: game.color }]}>
                    <Image source={GameImage} style={styles.image} />
                    <Text style={styles.levelText}>Niv {game.level}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.nameText}>{game.name}</Text>
                <Text style={styles.descriptionText}>{game.description}</Text>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Progressbar type="rectangular" text="" value={(game.progress / game.stages * 100) ?? 0} barColor={game.color} style={{width: '80%'}} />
                    <Text style={{ color: '#898A8D', fontSize: 10 }}>{game.progress + '/' + game.stages}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#cecece',
        borderRadius: 10,
    },
    leftContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        alignSelf: 'flex-start'
    },
    leftInner: {
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        borderRadius: 10,
    },
    image: {
        padding: 10,
        borderRadius: 25
    },
    levelText: {
        marginTop: 5,
        color: 'white',
        fontSize: 10,
    },
    rightContainer: {
        width: '70%',
        flex: 1,
        padding: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionText: {
        marginTop: 5,
        fontSize: 14,
    },
    progressBar: {
        marginTop: 10,
    },
});

export default GameItem;