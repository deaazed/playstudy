import React, { Key, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import TopBarCustom from '../../components/TopBarCustom';
import ChestImage from '../../assets/images/chest.svg';
import { useUsers } from '../../components/UsersContext';
import coinPacks from '../../constants/temp/Store';
import { Coin } from '../../services/Interfaces';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import CoinStoreItem from '../../components/CoinStoreItem';

const StorePage: React.FC = () => {
    const { state, dispatch } = useUsers();
    // const [clickedGame, setClickedGame] = useState<Game | undefined>(undefined);
    const [coinListe, setCoinListe] = useState<Array<JSX.Element>>([]);
    let coins = [];
    
    const fetchStore = async () => {
        dispatch({ type: "STORE_PROCESS_REQUEST"});
        if(state.store.length > 0) {
        coins = state.store;
        }
        // const response = await fetch('http://localhost:3000/store');
        const response = { json: () => Promise.resolve(coinPacks) };
        coins = await response.json();
        dispatch({ type: "STORE_FETCH", payload: coins });
    }

    useEffect(() => {
        fetchStore();
    }, []);
    
    useEffect(() => {
        setCoinListe(state.store.map((coin: Coin, index: Key | null | undefined) => <CoinStoreItem key={index} coin={coin} onPress={() => {}} />));
    }, [state.store]);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="dark"/>
            <View style={styles.container}>
                <TopBarCustom title="" />
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{flex: 0.4, alignItems: 'center', top: -50}}>
                        <ChestImage width={300} height={300}/>
                        <Text style={styles.title}>Acheter des pièces</Text>
                    </View>
                    <ScrollView style={{flex: 0.6, marginTop: 100}} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, padding: 20, gap: 20}}>
                            {coinListe}
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

export default StorePage;