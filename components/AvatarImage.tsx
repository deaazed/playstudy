import { getAvatars } from '@/data/avatar';
import React, { useEffect } from 'react';
import {StyleSheet, Image} from 'react-native';

export default function AvatarImage(props: {size: number, style?: {}, avatar: Parse.Object }) {  
  let avatarUri = props.avatar.get('image')?.url();
  useEffect(() => {
    if (!avatarUri) {
      getAvatars().then((avatars: Parse.Object[] | undefined) => {
        if (avatars) {
          const avatar = avatars.find((avatar: Parse.Object) => avatar.id === props.avatar.id);
          if (avatar) {
            avatarUri = avatar.get('image').url();
          }
        }
      });
    }
  }, [avatarUri]);
  return (
    <Image
        style={[styles.avatarImage, { ...props?.style, width: props.size, height: props.size}]}
        source={{uri: avatarUri}}
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