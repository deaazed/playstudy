import { StyleSheet, SafeAreaView, ScrollView, NativeSyntheticEvent, NativeScrollEvent, RefreshControl} from 'react-native';
import UserVisio from '@/components/UserVisio';
import { Key, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useUsers } from '@/components/UsersContext';
import React from 'react';
import { getUsers } from '@/models';
import Loader from '@/components/Loader';

export default function VisioScreen() {
  const { state, dispatch } = useUsers();
  const [clickedUser, setClickedUser] = useState<Parse.Object | undefined>(undefined);
  const [userListe, setUserListe] = useState<Array<JSX.Element>>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const fetchUsers = async () => {
    dispatch({ type: "USERS_PROCESS_REQUEST"});
    if(state.users.length === 0 || state.users === undefined) {
      getUsers().then((users : Parse.Object[] | undefined) => {
        dispatch({ type: "USERS_FETCH", payload: users });
      });
    }
  }
  
  useEffect(() => {
    if(state.users.length === 0) fetchUsers();
    else {
      const otherUsers = state.users.filter((user: Parse.Object) => user && user.id !== state.user.id);
      setUserListe(otherUsers.map((user: Parse.Object, index: Key | null | undefined) => <UserVisio key={index} user={user} onPress={() => setClickedUser(user)} style={undefined} />));
    }
  }, [state.users]);

  useEffect(() => {
    if (clickedUser !== undefined) {
      router.push(`/user/${clickedUser.id}`);
    }
  }, [clickedUser]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch({ type: "USERS_CLEAR" });
    setRefreshing(false);
  }, []);

  return (
    <>
      {userListe.length === 0 && <Loader />}
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <ScrollView
          style={{ width: '100%', paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {userListe}
        </ScrollView>
      </SafeAreaView>
    </>
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
