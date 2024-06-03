import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

export default function AnimatedDot(props : any) {

    const { number = 1 , active = 1, style } = props;

    let dots : Array<JSX.Element> = [];
    for (let index = 0; index < number; index++) {
        dots.push(<Animated.View key={index} style={{
            width: active == index ? 29 : 10,
            height: 10,
            borderRadius: 50,
            backgroundColor: active == index ? '#fff': 'rgba(255, 255, 255, 0.7)'
        }} />) 
    }

    return (
        <SafeAreaView style={[styles.container, style]}>
            {dots.map(dot => dot)}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: 50,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    } 
});