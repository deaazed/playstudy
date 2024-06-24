import { getAvatars } from '@/models';
import React, { useEffect } from 'react';
import {StyleSheet, Image} from 'react-native';

export default function AvatarImage(props: {size: number, style?: {}, avatar: Parse.Object }) {
  const [avatarUri, setAvatarUri] = React.useState<string | undefined>(undefined);
  useEffect(() => {
    setAvatarUri(props.avatar.get('image')?.url());
    if (!avatarUri) {
      getAvatars().then((avatars: Parse.Object[] | undefined) => {
        if (avatars) {
          const avatar = avatars.find((avatar: Parse.Object) => avatar.id === props.avatar.id);
          if (avatar) {
            setAvatarUri(avatar.get('image').url());
          }
        }
      });
    }
  }, []);
  return (
    <>
    { avatarUri &&
    <Image
        style={[styles.avatarImage, { ...props?.style, width: props.size, height: props.size}]}
        source={{uri: avatarUri}}
    />
    }
    </>
  )
}

const styles = StyleSheet.create({
    avatarImage: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000",
    },
});