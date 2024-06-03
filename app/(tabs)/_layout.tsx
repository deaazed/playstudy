import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors, { statusBarStyles } from '../../constants/Colors';
import React, { useState } from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'exercises'
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [barStyle, setBarStyle] = useState<StatusBarStyle | undefined>("light");
  return (
    <>
    <StatusBar style={barStyle}/>
    <Tabs
      screenListeners={{
        tabPress:(e : any) => { setBarStyle(statusBarStyles[e.target.split("-")[0]]) }
      }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tabBackgroundColor,
          height: 83,
          borderTopWidth: 0.5,
          borderColor: "#f0f0f0"
        }
      }}>
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown:false,
          tabBarLabelStyle: {
            bottom: 15
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="certificate" color={color} />,
        }}
      />
      <Tabs.Screen
        name="visio"
        options={{
          headerTitle: "Visio",
          headerTitleStyle: {
            fontFamily: 'PopinsRegular',
            fontSize: 18
          },
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            bottom: 15
          },
          headerLeft: () => (
            <Pressable style={{marginHorizontal: 20}} onPress={() => router.push('/exercises')}>
              <Entypo name="chevron-thin-left" color="#263238" size={20}/>
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="video" color={color} />
        }}
      />
      <Tabs.Screen
        name="badge"
        options={{
          headerTitle: "Badges remportés",
          headerTitleStyle: {
            fontFamily: 'PopinsRegular',
            fontSize: 18
          },
          headerLeft: () => (
            <Pressable onPress={()=> router.push('/exercises')} style={{marginHorizontal: 20}}>
              <Entypo name="chevron-thin-left" color="#263238" size={20}/>
            </Pressable>
          ),
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            bottom: 15
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="award" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          headerTitle: "Profil",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: 'PopinsRegular',
            fontSize: 18,
            color: "#fff"
          },
          headerStyle: {
            backgroundColor: "#3444F1",
            elevation: 0
          },
          tabBarLabelStyle: {
            bottom: 15
          },
          headerLeft: () => (
            <Pressable onPress={()=> router.push('/exercises')} style={{alignItems:"center", justifyContent:"center", marginLeft: 20, width: 42, height: 42, backgroundColor: "#fff", padding: 5, borderRadius: 12}}>
              <Entypo name="chevron-thin-left" color="#263238" size={20}/>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={()=> router.push('/parameter')} style={{alignItems:"center", justifyContent:"center", marginRight: 20, width: 42, height: 42, backgroundColor: "#fff", padding: 5, borderRadius: 12}}>
              <Entypo name="dots-three-vertical" color="#263238" size={20}/>
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}
