import React, { Key, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import TopBarCustom from '../../components/TopBarCustom';
import DoorImage from '../../assets/images/door.svg';
import { useUsers } from '../../components/UsersContext';
import arrayGames from '../../constants/temp/Games';
import GameItem from '../../components/GameItem';
import { Game } from '../../services/Interfaces';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign  } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ListPage: React.FC = () => {
    const { state, dispatch } = useUsers();
    // const [clickedGame, setClickedGame] = useState<Game | undefined>(undefined);
    const [gameListe, setGameListe] = useState<Array<JSX.Element>>([]);
    let games = [];
    
    const fetchGames = async () => {
        dispatch({ type: "GAMES_PROCESS_REQUEST"});
        if(state.games.length > 0) {
        games = state.games;
        }
        // const response = await fetch('http://localhost:3000/games');
        const response = { json: () => Promise.resolve(arrayGames) };
        games = await response.json();
        dispatch({ type: "GAMES_FETCH", payload: games });
    }

    useEffect(() => {
        fetchGames();
    }, []);
    
    useEffect(() => {
        setGameListe(state.games.map((game: Game, index: Key | null | undefined) => <GameItem key={index} game={game} onPress={() => {}} />));
    }, [state.games]);

    const rightButton : React.ReactNode = (
        <Pressable onPress={() => router.push('/game/infos')}>
            <AntDesign name="questioncircleo" color="#263238" size={24} />
        </Pressable>
    );

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="dark"/>
            <View style={styles.container}>
                <TopBarCustom title="" rightButton={rightButton}/>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{flex: 0.4, alignItems: 'center', top: -50}}>
                        <DoorImage width={300} height={300}/>
                        <Text style={styles.title}>Choisis un mode de jeu</Text>
                    </View>
                    <ScrollView style={{flex: 0.6, marginTop: 100}} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, padding: 20, gap: 20}}>
                            {gameListe}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

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
        fontFamily: 'PopinsMedium'
    }
});

export default ListPage;