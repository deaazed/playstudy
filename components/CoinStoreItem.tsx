import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CoinStoreItemProps } from '../services/Interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CoinStoreItem : React.FC<CoinStoreItemProps> = ({ coin, onPress }) => {
    const CoinImage = coin.image ? coin.image : require('../assets/images/fire.png');

    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.leftInner}>
                    <Image source={CoinImage} style={styles.image} />
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.quantityText}>{coin.quantity} pièces</Text>
                <Text style={styles.quantityText}>{coin.price}€</Text>
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
        alignSelf: 'flex-start',
        width: '30%'
    },
    leftInner: {
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#3444F1',
    },
    image: {
        padding: 10,
        borderRadius: 25,
        width: "100%",
    },
    rightContainer: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'space-between'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default CoinStoreItem;