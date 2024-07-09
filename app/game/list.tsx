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
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getGames } from '@/models/games';
import { getAwardsByTheme } from '@/models/awards';
import { getTheme } from '@/models/themes';
import { GAMEIDS } from '@/constants/Config';

export default function ListPage() {
    const params = useLocalSearchParams();
    const { state, dispatch } = useUsers();
    // const [clickedGame, setClickedGame] = useState<Game | undefined>(undefined);
    const [gameListe, setGameListe] = useState<Array<JSX.Element>>([]);
    let games : any[] = [];
    let awards : any[] = [];
    
    const fetchGames = async () => {
        dispatch({ type: "GAMES_PROCESS_REQUEST"});
        dispatch({ type: "AWARDS_PROCESS_REQUEST"});
        if(state.games.length > 0) {
            games = state.games;
        }
        if(state.awards.length > 0) {
            awards = state.awards;
        }
        games = await getGames();
        const theme = await getTheme(params?.theme as string);
        awards = await getAwardsByTheme(theme as Parse.Object);
        dispatch({ type: "AWARDS_FETCH", payload: awards });
        dispatch({ type: "GAMES_FETCH", payload: games });
    }

    useEffect(() => {
        fetchGames();
    }, []);
    
    useEffect(() => {
        setGameListe(state.games.map((game: Parse.Object, index: Key | null | undefined) => {
            let progress = 0, level = 1;
            state.awards.forEach((award : Parse.Object) => {
                console.log(award.get('game').id, game.id, state.awards);
                if(award.get('game').id === game.id) progress++;
            });
            if(progress >= 20) {
                progress = progress - 20;
                level = 3;
            } else if(progress >= 10) {
                progress = progress - 10;
                level = 2;
            }
            const gamePath = GAMEIDS[game.id as keyof typeof GAMEIDS];
            return <Pressable key={index} onPress={() => router.push({pathname:`/game/${gamePath}`, params: {id: game.id, level: level, progress: progress, color: game.get('color')}})}><GameItem  game={game} onPress={() => {}} progress={progress} level={level} /></Pressable>;
        }));
    }, [state.games, state.awards]);

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
