import {View, Text, StyleSheet, ImageSourcePropType, TouchableHighlight} from 'react-native';
import AvatarImage from './AvatarImage';
import { UserItemProps } from '../services/Interfaces';
import { FontAwesome } from '@expo/vector-icons';

export default function UserVisio(props: UserItemProps) {
    const defaultAvatarImageSource = require('../assets/images/notFoundUserImage.png');
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor="white">
            <View style={[styles.container, props.style]}>
                <View style={styles.avatar}>
                    <AvatarImage size={53} avatarImageSource={props.user.avatarImage ?? defaultAvatarImageSource} />
                </View>
                <View style={{ flex: 0.7}} >
                    <Text style={{fontSize:16, fontFamily: 'PopinsBold', color: "#263238" }}>{props.user.name}</Text>
                    <Text style={{fontSize:14, fontFamily: 'PopinsRegular', color: "#3444F1"}}>{props.user.disponibility}</Text>
                </View>
                <View style={{width: 35, height: 35, borderRadius: 100, backgroundColor: "#4D4D4D", alignItems:"center", justifyContent: "center"}}>
                    <FontAwesome name="chevron-right" color="#fff" size={15}/>
                </View>
            </View>
        </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        marginVertical: 10,
        padding: 5,
        borderRadius: 10,
        borderColor: "#4D4D4D",
        gap: 10,
        borderWidth: 1
    },
    avatar: {
        flex: 0.2,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});