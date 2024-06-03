import { StatusBar } from 'expo-status-bar';
import { Animated, Vibration, Platform, StyleSheet, View as DefaultView, SafeAreaView, TextInput, Pressable, Keyboard } from 'react-native';
import { Text, View } from '../components/Themed';
import WelcomeSvg from '../assets/images/broimage-welcome.svg';
import GoogleLogo from '../assets/images/google-logo.svg';
import Tutorial from '../components/Tutorial';
import { useEffect, useRef, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import React from 'react';

export default function WelcomeScreen() {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [reduceWelcome, setReduceWelcome] = useState<boolean>(false);
  const [hidePassword, setHidePassWord] = useState<boolean>(true);
  const [firstOpen, setFirstOpen] = useState<boolean>(true);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => Vibration.vibrate());

    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setReduceWelcome(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setReduceWelcome(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
    <View lightColor='#fff' darkColor='#000' style={styles.container}>
      <DefaultView style={{flex: 0.5, alignItems: 'center'}}>
        <WelcomeSvg width={reduceWelcome ? 100 : 219} height={reduceWelcome ? 100 : 227}/>
        <Text style={{fontSize: 48, margin: 20 }}>Bienvenue !</Text>
      </DefaultView>

      <SafeAreaView style={{flex: 0.4, alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 15,width: '100%', paddingHorizontal: 20}}>
        <TextInput
          style={styles.input}
          placeholder='jean.durand@gmail.com'
        />
        <SafeAreaView style={[styles.input, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <TextInput
            secureTextEntry={hidePassword}
            placeholder='••••••••••••••••'
            style={{ height:50, width: '90%' }}
          />
          <Pressable  style={{ width: '10%', alignItems:'center', justifyContent:'center', height:50 }} onPress={() => setHidePassWord(!hidePassword)}><FontAwesome name={hidePassword ? "eye" : "eye-slash"} size={18} color="rgba(60, 60, 67, 0.6)"/></Pressable>
        </SafeAreaView>
        <Link href='/(tabs)/exercises' style={[styles.buttonConnect, {color: '#fff', fontSize: 22 }]}>
          Se connecter
        </Link>
        <Pressable style={styles.buttonConnectGoogle}>
          <GoogleLogo width={14} height={14}/>
          <Text lightColor='#000' darkColor='#fff' style={{ fontSize: 13 }}>Connectez-vous avec Google</Text>
        </Pressable>
      </SafeAreaView>

      <DefaultView  style={{flex: 0.1, alignItems: 'center', flexDirection:'row', gap: 5, display: reduceWelcome ? 'none': 'flex'}}><Text lightColor='rgba(60, 60, 67, 0.6)' darkColor='#fff' style={{fontSize: 13 }}>Vous n'avez pas encore de compte?</Text><Link href='/register'><Text style={{fontSize: 13, color: '#3444F1'}}>S'inscrire</Text></Link></DefaultView>
      
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
      { firstOpen &&
        <View style={styles.overlay}>
        <SafeAreaView style={{flex: 0.5, width: '100%'}}>
          <Animated.View style={{flex: 1,translateY: slideAnim }}>
            <Tutorial onEnd={() => setFirstOpen(false)}/>
          </Animated.View>
        </SafeAreaView>
      </View>
      }
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    height: '100%',
    width: '100%'
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: 'rgba(28, 28, 30, 0.2)'
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.6)',
    height: 50,
    width: '100%',
    borderRadius: 40,
    paddingHorizontal: 20
  },
  buttonConnect: {
    textAlignVertical: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#3444F1',
    borderRadius: 40,
    textAlign: 'center'
  },
  buttonConnectGoogle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
  }
});
