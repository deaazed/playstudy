import React from "react";
import Progressbar from "./Progressbar";
import { Text, View } from "./Themed";
import { View as DefaultView, StyleSheet } from 'react-native'

export default function Thematique(props: { title : string, style?: {},  progress? : number, icon: JSX.Element }) {
    return (
      <View lightColor='#fff' style={[styles.container,styles.container, props.style]}>
        <DefaultView style={{gap : 10}}>
          <Text lightColor='#000' style={{fontSize: 14}}>{props.title}</Text>
          <Progressbar type="rectangular" value={props.progress ?? 0} barColor="rgba(56, 239, 125, 1)" style={{width: '80%'}} />
        </DefaultView>
        {props.icon}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 76,
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent:'space-between',
    borderRadius: 12,
    padding: 15,
    shadowColor: 'rgba(38, 50, 56, 0.25)',
    shadowOffset: { width: 0, height: 8},
    shadowRadius: 0,
    elevation: 4,
    backgroundColor: 'white'
  }
});
