import { StatusBarStyle } from "expo-status-bar";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const statusBarStyles : { [screen: string] : StatusBarStyle } = {
  "badge": "dark",
  "exercises": "light",
  "profil": "light",
  "visio": "dark"
}

export default {
  light: {
    text: '#000',
    background: '#3444F1',
    tint: tintColorLight,
    tabBackgroundColor: '#fff',
    tabIconDefault: '#000',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabBackgroundColor: '#000',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

