import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Progressbar from './Progressbar';
import { GameItemProps } from '../services/Interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';


const GameItem = ({ game, onPress, level, progress } : { game: Parse.Object, onPress : Function, level: number, progress: number}) => {
    const GameImage = game.get('image') ? { uri: game.get('image').url() } : require('../assets/images/fire.png');
    const stages = 10;
    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={[styles.leftInner, { backgroundColor: game.get('color') }]}>
                    <Image source={GameImage} style={styles.image} />
                    <Text style={styles.levelText}>Niv {level ?? 1}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.nameText}>{game.get('name')}</Text>
                <Text style={styles.descriptionText}>{game.get('description')}</Text>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Progressbar type="rectangular" text="" value={(progress / stages * 100) ?? 0} barColor={game.get('color')} style={{width: '80%'}} />
                    <Text style={{ color: '#898A8D', fontSize: 10 }}>{progress + '/' + stages}</Text>
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