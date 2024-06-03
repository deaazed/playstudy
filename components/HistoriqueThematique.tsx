import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function HistoriqueThematique(props: { title : string, style?: {},  level : number, lastExercise: number}) {
    return (
      <TouchableOpacity onPress={() => router.push('/game/list')} style={[styles.container,styles.container, props.style]}>
        <View>
            <View style={{ flexDirection: 'row'}}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{props.title}</Text>
                <Text style={{fontSize: 18, color: 'white' }}> - Niv {props.level}</Text>
            </View>
            <Text style={{fontSize: 16, color: 'white' }}>{props.lastExercise}{props.lastExercise == 1 ? 'er' : 'ème'} exercice</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'white' }}>Reprendre l'exercice</Text>
            <View style={styles.btnGoExercise}><FontAwesome name="chevron-right" size={14} /></View>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderRadius: 15,
    height: '100%',
    padding: 10,
    marginHorizontal: 3
  },
  btnGoExercise: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    marginLeft: 10,
    borderRadius: 15
  }
});
