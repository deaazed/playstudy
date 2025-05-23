/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { StatusBar as DefaultStatusBar, StatusBarProps } from 'expo-status-bar';
import { StatusBarStyle } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // const theme = useColorScheme() ?? 'light';
  const theme = "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style, styles.text]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function StatusBar(props: {style?: StatusBarStyle, updater?: any}) {
  const [mode, setMode] = useState<StatusBarStyle|undefined>("dark" as StatusBarStyle);
  useEffect(() => {
    setMode(props?.style);
    return;
  }, [props.updater]);
  return <DefaultStatusBar style={mode} />
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PopinsMedium'
  }
});