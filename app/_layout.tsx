import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { UsersProvider } from '../components/UsersContext';
import React from 'react';
import { GAMEIDS } from '@/constants/Config';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PopinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PopinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PopinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {loaded && !error && <RootLayoutNav />}
      {}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [gamesScreens, setGamesScreens] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    setGamesScreens(
      Object.values(GAMEIDS).map((gameName : string, index: any) => <Stack.Screen key={index} name={`game/${gameName}`} options={{ headerShown: false }} />)
    );
  }, []);
  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UsersProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="register/index" options={{ headerShown: false }} />
              <Stack.Screen name="register/avatar" options={{ headerShown: false }} />
              <Stack.Screen name="register/age" options={{ headerShown: false }} />
              <Stack.Screen name="register/name" options={{ headerShown: false }} />
              <Stack.Screen name="register/email" options={{ headerShown: false }} />
              <Stack.Screen name="register/pass" options={{ headerShown: false }} />
              <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="user/message/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="user/visio/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="user/visio/incoming" options={{ headerShown: false }} />
              <Stack.Screen name="parameter" options={{ headerShown: false }} />
              <Stack.Screen name="game/list" options={{ headerShown: false }} />
              <Stack.Screen name="game/infos" options={{ headerShown: false }} />
              <Stack.Screen name="game/store" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {gamesScreens}
            </Stack>
        </UsersProvider>
      </ThemeProvider>
    </>
  );
}
