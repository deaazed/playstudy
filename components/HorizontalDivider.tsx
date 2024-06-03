import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface HorizontalDividerProps {
    width?: ViewStyle['width'] | number;
    borderWidth?: number;
    alignSelf?: ViewStyle['alignSelf'];
}

const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
    width = 100,
    borderWidth = 1,
    alignSelf = 'center',
}) => {
    return (
        <View style={[styles.divider, { width, alignSelf, borderBottomWidth: borderWidth }]} />
    );
};

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#cecece',
    },
});

export default HorizontalDivider;