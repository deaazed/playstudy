import { StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useUsers } from '../../../components/UsersContext';
import { User } from '../../../services/Interfaces';
import { Entypo, Feather } from '@expo/vector-icons';
import { Text, View } from '../../../components/Themed';
import TopBarCustom from '../../../components/TopBarCustom';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function MessageScreen() {
    const params = useLocalSearchParams();
    const { state, dispatch } = useUsers();
    const [user, setUser] = useState<User | undefined>(undefined);

    function handleGoVisio(): void {
      router.push({ pathname: 'user/visio/' + user?.id });
    }

    const rightButton : React.ReactNode = (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', gap: 10 }}>
        <Pressable onPress={() => {}}>
            <Feather name="video" color="#263238" size={24} />
        </Pressable>
        <Pressable onPress={() => handleGoVisio()}>
            <Feather name="phone-call" color="#263238" size={24} />
        </Pressable>
      </View>
    );

    useEffect(() => {
        if (params.id !== undefined) {
            setUser(state.users.find((user: User) => user.id.toString() === params.id));
        }
    }, [params.id]);

    return (
      <>
        <StatusBar style="dark"/>
        <SafeAreaView style={styles.container}>
          <TopBarCustom title={user?.name ?? ''} type="dark" rightButton={rightButton}/>
          <View style={{flex: 0.9, width: "100%", padding: 0, margin: 0, backgroundColor: '#fff'}}></View>
          <View style={{flex: 0.1, width: '100%', paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <View style={styles.messageContainer}>
              <TextInput style={styles.messageInput} placeholder="Ecrire un message..." />
              <Pressable style={styles.sendButton}>
                <Entypo name="paper-plane" size={22} color="white" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    padding: 0,
    margin: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    bottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#4D4D4D',
    borderRadius: 10
  },
  messageInput: {
    width: "80%",
    height: 50,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#3444F1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});