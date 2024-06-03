import { StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { User } from '../../services/Interfaces';
import { Disponibility } from '../../services/Enums';
import arrayUsers from '../../constants/temp/Users';
import UserVisio from '../../components/UserVisio';
import { Key, useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router';
import { useUsers } from '../../components/UsersContext';
import React from 'react';

export default function VisioScreen() {
  const { state, dispatch } = useUsers();
  const [clickedUser, setClickedUser] = useState<User | undefined>(undefined);
  const [userListe, setUserListe] = useState<Array<JSX.Element>>([]);
  let users = [];
  
  const fetchUsers = async () => {
    dispatch({ type: "USERS_PROCESS_REQUEST"});
    if(state.users.length > 0) {
      users = state.users;
    }
    // const response = await fetch('http://localhost:3000/users');
    const response = { json: () => Promise.resolve(arrayUsers) };
    users = await response.json();
    dispatch({ type: "USERS_FETCH", payload: users });
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  
  useEffect(() => {
    setUserListe(state.users.map((user: User, index: Key | null | undefined) => <UserVisio key={index} user={user} onPress={() => setClickedUser(user)} style={undefined} />));
  }, [state.users]);

  useEffect(() => {
    if (clickedUser !== undefined) {
      router.push(`/user/${clickedUser.id}`);
    }
  }, [clickedUser]);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <ScrollView style={{width: '100%', paddingHorizontal: 20}} showsVerticalScrollIndicator={false}>{userListe}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
