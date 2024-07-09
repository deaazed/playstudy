import { StyleSheet, SafeAreaView} from 'react-native';
import { useEffect, useState } from 'react';
import UserProfile from '../../components/UserProfil';
import { useLocalSearchParams } from 'expo-router';
import { useUsers } from '../../components/UsersContext';
import { View } from '../../components/Themed';
import TopBarCustom from '../../components/TopBarCustom';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { getUser, getUsers } from '@/models';
import Loader from '@/components/Loader';

export default function UserScreen() {
    const params = useLocalSearchParams();
    const { state, dispatch } = useUsers();
    const [user, setUser] = useState<Parse.Object | undefined>(undefined);
    useEffect(() => {
      if (params.id !== undefined) {
        if(state.users.length === 0) {
          getUsers().then((users : Parse.Object[] | undefined) => {
            dispatch({ type: "USERS_FETCH", payload: users });
            setUser(state.users.find((user: Parse.Object) => user.id === params.id));
          });
        } else {
          let user = state.users.find((user: Parse.Object) => user.id === params.id);
          if(user) setUser(user);
          else {
            getUser(params.id as string).then((user : Parse.Object | undefined) => {
              if(user) setUser(user);
              else console.error('Error while fetching user');
            });
          }
        }
      }      
    }, [params.id]);

    return (
      <>
        <StatusBar style="light"/>
        { user && 
        <SafeAreaView style={[styles.container, { padding: 0 }]}>
          <TopBarCustom title="Profil" />
          <View style={{flex: 0.9, width: "100%", padding: 0, margin: 0}}>
            <UserProfile user={user} />
          </View>
        </SafeAreaView> 
        }
        { !user && <Loader /> }
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#3444F1",
    padding: 0,
    margin: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
