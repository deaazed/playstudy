import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DragIndicator(props: any) {
  return (
    <View style={[styles.separator, props.extraStyle]} />
  )
}

const styles = StyleSheet.create({
    separator: {
        position:'absolute',
        height: 4,
        width: 70,
        backgroundColor: '#FFEDDA',
        borderRadius: 100,
        margin: 15
    }
});