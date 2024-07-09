import React, { useEffect } from 'react';
import {StyleSheet, View as DefaultView, TouchableOpacity} from 'react-native';
import { Text, View } from './Themed';
import { Coin } from '@/assets/images';
import { router } from 'expo-router';
import { useUsers } from './UsersContext';

export default function Awards(props: { markEdges?: boolean}) {
    const { state } = useUsers();
    const [earnings, setEarnings] = React.useState<number>(0);

    useEffect(() => {
        state.awards.forEach((award : Parse.Object) => {
            setEarnings(earnings + 30);
        });
    }, []);

    return (
        <>
            <DefaultView style={styles.containerEarning}>
            
            <TouchableOpacity onPress={() => router.push('/game/store')}>
            <View lightColor='#fff' style={[styles.earnings, { borderWidth: 1, borderColor: props.markEdges ? '#616161' : '#fff' }]}><Coin style={{position: 'absolute', left: -10}}/><Text lightColor='#616161' style={{fontSize: 10}}>{earnings}+</Text></View>
            </TouchableOpacity>
            </DefaultView>
        </>
    )
}

const styles = StyleSheet.create({
    containerEarning : {
        flex: 0.1, 
        paddingHorizontal: 10, 
        justifyContent: 'center', 
        marginTop: 50, 
        width:"100%",
        alignItems: 'flex-end'
      },
    earnings: {
        width: 52,
        height: 19,
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    }
});