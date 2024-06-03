import { StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, Text} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useUsers } from '@/components/UsersContext';
import { Message, User } from '@/services/Interfaces';
import { Entypo, Feather } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import TopBarCustom from '@/components/TopBarCustom';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loader from '@/components/Loader';

export default function MessageScreen() {
    const params = useLocalSearchParams();
    const { state, dispatch } = useUsers();
    const [user, setUser] = useState<Parse.Object | undefined>(undefined);
    const [message, setMessage] = useState<string>('');
    const [serverState, setServerState] = React.useState('Loading...');
    const [serverMessages, setServerMessages] = React.useState<Message[]>();
    var ws = React.useRef(new WebSocket('https://websocket-mxh5j2eu.b4a.run/')).current;

    useEffect(() => {
      const serverMessagesList: any[] = [];
      ws.onopen = () => {
        console.log('Connected');
        setServerState('Connected');
        ws.send(JSON.stringify({
          id: Math.random(),
          content: 'Hello Server!',
          sender: 'Client',
          receiver: 'Server',
          createdAt: new Date()
        }));
      };
      ws.onmessage = (e : MessageEvent) => {
        console.log('Message:', e.data);
        const message : Message = JSON.parse(e.data);
        if(message.receiver === state.user.id || message.sender === state.user.id) {
          serverMessagesList.push(JSON.parse(e.data));
          setServerMessages([...serverMessagesList]);
        }
      };
      ws.onerror = (e) => {
        console.log('Error:', e);
        setServerState(e.toString());
      };
    }, []);

    useEffect(() => {
        if (params.id !== undefined) {
            setUser(state.users.find((user: Parse.Object) => user.id === params.id as string));
        }
    }, [params.id]);


    function handleGoVisio(): void {
        router.push(`/user/visio/${user?.id}`);
    }

    function handledTextChange(event: any): void {
      setMessage(event.nativeEvent.text);
    }

    function handleMessageSend(): void {
      console.log(user);
      
      if (user) {
        const payload : Message = {
          id: Math.random(),
          content: message,
          sender: state.user.id,
          receiver: user.id,
          createdAt: new Date()
        };
        ws.send(JSON.stringify(payload));
        setMessage('');
      }
    }

    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        handleMessageSend();
      }
    };

    useEffect(() => {
        if (params.id !== undefined) {
            setUser(state.users.find((user: User) => user.id.toString() === params.id));
        }
    }, [params.id]);

    // useEffect(() => {
    //   window.addEventListener('keydown', handleKeyPress);
    //   return () => {
    //     window.removeEventListener('keydown', handleKeyPress);
    //   };
    // }, []);

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


    return (
      <>
        <StatusBar style="dark"/>
        { !user && <Loader />}
        { user &&
        <SafeAreaView style={styles.container}>
          <TopBarCustom title={user?.get('username') ?? ''} type="dark" rightButton={rightButton}/>
          <View style={{flex: 0.9, width: "100%", paddingHorizontal: 20, margin: 0, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-end'}}>
            <ScrollView>
              {serverMessages?.map((message, index) => (
                <View key={index} style={message.sender === state.user.id ? styles.messageMine : styles.messageHis}>
                  <Text style={[styles.messageText, message.sender === state.user.id ? styles.mine : styles.his]}>{message.content}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{flex: 0.1, width: '100%', paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <View style={styles.messageContainer}>
              <TextInput value={message} onChange={(e) => handledTextChange(e)} style={styles.messageInput} placeholder="Ecrire un message..." />
              <Pressable style={styles.sendButton} onPress={handleMessageSend}>
                <Entypo name="paper-plane" size={22} color="white" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
        }
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
  messageMine: {
    width: undefined,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#3444F1',
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  messageHis: {
    width: undefined,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#dedede',
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'PopinsRegular'
  },
  mine: {
    color: '#fff'
  },
  his: {
    color: '#252525'
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