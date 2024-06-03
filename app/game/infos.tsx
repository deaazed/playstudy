import React, { Key, useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import TopBarCustom from '../../components/TopBarCustom';
import Parchemin from '../../assets/images/parchemin.svg';
import { useUsers } from '../../components/UsersContext';
import { Game } from '../../services/Interfaces';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const InfoPage: React.FC = () => {
    const { state, dispatch } = useUsers();
    // const [clickedGame, setClickedGame] = useState<Game | undefined>(undefined);
    const [gameInfos, setGameInfos] = useState<Array<JSX.Element>>([]);
    let games = [];
    
    const fetchGames = async () => {
        games = dispatch();
    }

    useEffect(() => {
        fetchGames();
    }, []);
    
    useEffect(() => {
        setGameInfos(state.games.map((game: Game, index: Key | null | undefined) => 
            <View style={styles.gameInfos} key={index}>
                <Text style={styles.gameInfosText}>Le mode de jeu "{game.name}" consite à {game.exlpaination}</Text>
            </View>
        ));
    }, [state.games]);

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <StatusBar style="dark"/>
            <View style={styles.container}>
                <TopBarCustom title="" rightButton={<></>} />
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{flex: 0.4, alignItems: 'center', top: -50}}>
                        <Parchemin width={300} height={300}/>
                        <Text style={styles.title}>Explication des modes de jeu</Text>
                    </View>
                    <ScrollView style={{flex: 0.6, marginTop: 100}} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, padding: 20, gap: 20}}>
                            {gameInfos}
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
    },
    gameInfos: {
        backgroundColor: '#3444F1',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gameInfosText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'PopinsRegular'
    }
});

export default InfoPage;