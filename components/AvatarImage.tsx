import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';

export default function AvatarImage(props: {size: number, style?: {}, avatarImageSource: any }) {
  return (
    <Image
        style={[styles.avatarImage, { ...props?.style, width: props.size, height: props.size}]}
        source={props.avatarImageSource}
    />
  )
}

const styles = StyleSheet.create({
    avatarImage: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000",
    },
});