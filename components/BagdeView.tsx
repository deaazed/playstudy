import {View, Text, StyleSheet} from 'react-native';
import Badge from '../assets/images/badge.svg';
import React from 'react';

export default function BagdeView(props: { style?: {}, title : string, subTitle: string }) {
  return (
    <View style={[styles.container, props.style]}>
        <View style={styles.bagdeLogo}>
            <Badge />
        </View>
        <View style={{ flex: 0.8}} >
            <Text style={{color: 'white', fontSize:18, fontWeight: 'bold' }}>{props.title}</Text>
            <Text style={{color: 'white', fontSize:16}}>{props.subTitle}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        padding: 15,
        borderRadius: 8,
        gap: 10
    },
    bagdeLogo: {
        flex: 0.2,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 3,
        backgroundColor: 'white',
        width: 94,
        height: 94,
        borderColor: '#FF8504'
    }
});