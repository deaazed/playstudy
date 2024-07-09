import { StatusBar } from 'expo-status-bar';
import { Animated, Vibration, Platform, StyleSheet, View as DefaultView, SafeAreaView, TextInput, Pressable, Keyboard } from 'react-native';
import { Text, View } from '@/components/Themed';
import WelcomeSvg from '@/assets/images/broimage-welcome.svg';
import GoogleLogo from '@/assets/images/google-logo.svg';
import Tutorial from '@/components/Tutorial';
import { useEffect, useRef, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { Link, router } from 'expo-router';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import "react-native-get-random-values";
import { userLogin, userSignup } from '@/models';
import { useUsers } from '@/components/UsersContext';
import * as config from '@/constants/Config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ParseUser } from "@/services/Interfaces";
import { Camera } from 'expo-camera';
// import { GOOGLE_CLIENT_ID_ANDROID } from '@/constants/Config';

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(config.BACK4APP_APP_ID, config.BACK4APP_JS_KEY);
//Point to Back4App Parse API address 
Parse.serverURL = config.BACK4APP_SERVER_URL;
export default function WelcomeScreen() {
  const { state, dispatch } = useUsers();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [reduceWelcome, setReduceWelcome] = useState<boolean>(false);
  const [hidePassword, setHidePassWord] = useState<boolean>(true);
  const [firstOpen, setFirstOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  GoogleSignin.configure({
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      if(GoogleSignin.hasPreviousSignIn()) await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      if(userInfo) {
        userLogin({
          email: userInfo.user.email, 
          password: userInfo.user.id,
          id: '',
          username: '',
          age: 0,
          disponibility: '',
          avatar: undefined
        }).then((user: Parse.User | undefined) => {          
          if(user) {
            console.log('User logged in', user);
            dispatch({ type: "USER_FETCH", payload: user });
            router.push('/(tabs)/exercises');
          } else {
            const user = {
              email: userInfo.user.email,
              password: userInfo.user.id,
              id: '',
              username: userInfo.user.givenName,
              age: 0,
              disponibility: '',
              avatar: undefined
            } as ParseUser;
            dispatch({ type: "USER_FETCH", payload: user });
            router.push('/register/avatar');
          };
        });
      }
    } catch (error) {
      console.log('Error while signing in with Google', error);
    }
  }

  const handleLogin = async () => {
    userLogin({
      email: email, 
      password: password,
      id: '',
      username: '',
      age: 0,
      disponibility: '',
      avatar: undefined
    }).then((user: Parse.User | undefined) => {
      if(user) {
        console.log('User logged in', user);
        dispatch({ type: "USER_FETCH", payload: user });
        router.push('/(tabs)/exercises');

      }
    }).catch((error: Error) => {
      setErrorMessage(error.message);
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.log('Error while requesting camera permissions', error);
      }
    })();
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
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />
        <SafeAreaView style={[styles.input, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <TextInput
            secureTextEntry={hidePassword}
            placeholder='••••••••••••••••'
            style={{ height:50, width: '90%' }}
            onChange={(event) => setPassword(event.nativeEvent.text)}
          />
          <Pressable  style={{ width: '10%', alignItems:'center', justifyContent:'center', height:50 }} onPress={() => setHidePassWord(!hidePassword)}><FontAwesome name={hidePassword ? "eye" : "eye-slash"} size={18} color="rgba(60, 60, 67, 0.6)"/></Pressable>
        </SafeAreaView>
        <Pressable onPress={handleLogin} style={styles.buttonConnect}>
          <Text style={{color: '#fff', fontSize: 18}}>Se connecter</Text>
        </Pressable>
        <Pressable style={styles.buttonConnectGoogle} onPress={() => signIn()}>
          <GoogleLogo width={14} height={14}/>
          <Text lightColor='#000' darkColor='#fff' style={{ fontSize: 13 }}>Connectez-vous avec Google</Text>
        </Pressable>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      </SafeAreaView>
    
      <DefaultView  style={{flex: 0.1, alignItems: 'center', flexDirection:'row', gap: 5, display: reduceWelcome ? 'none': 'flex'}}>
        <Text lightColor='rgba(60, 60, 67, 0.6)' darkColor='#fff' style={{fontSize: 13 }}>Vous n'avez pas encore de compte?</Text>
        <Link href='/register'><Text style={{fontSize: 13, color: '#3444F1'}}>S'inscrire</Text></Link>
      </DefaultView>
      
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 50,
    backgroundColor: '#3444F1',
    borderRadius: 40
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

function setHasPermission(arg0: boolean) {
  throw new Error('Function not implemented.');
}

