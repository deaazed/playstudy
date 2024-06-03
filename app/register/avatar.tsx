import React from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text, ImageSourcePropType } from 'react-native';
import Avatars from '../../constants/Avatars';
import { StatusBar } from 'expo-status-bar';
import TopBarCustom from '../../components/TopBarCustom';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useUsers } from '../../components/UsersContext';

const AvatarScreen = () => {
    const { state, dispatch } = useUsers();
    const [selectedAvatar, setSelectedAvatar] = React.useState(null);
    const renderAvatarItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.avatarItem}>
                { selectedAvatar === item.id &&
                    <View style={styles.checkBadge}>
                        <FontAwesome name="check" size={8} color="#fff"/>
                    </View>
                }
                <TouchableOpacity style={[styles.avatarContainer, { borderColor : selectedAvatar === item.id ? '#3444F1' : '#cecece' }]} onPress={() => handleAvatarPress(item)}>
                    <Image source={item.image} style={styles.avatarImage} />
                </TouchableOpacity>
            </View>
        );
    };

    const handleAvatarPress = (avatar: { id: any, image: NodeRequire}) => {
        // Handle avatar press event here
        setSelectedAvatar(avatar.id);
        const user = { avatar: avatar.image };
        const currentUser = state.user;   
        dispatch({ type: "USER_FETCH", payload: Object.assign(currentUser, user) });
    };

    return (
        <>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <TopBarCustom title='' rightButton={<></>}/>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Choisis ton avatar</Text>
                    <FlatList
                        data={Avatars}
                        numColumns={3}
                        renderItem={renderAvatarItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
                <View style={styles.buttomView}>
                    <TouchableOpacity style={[styles.nextButton, { backgroundColor: selectedAvatar === null ? '#cecece' : '#3444F1' } ]} disabled={selectedAvatar === null} onPress={() => router.push("/register/name")}>
                        <Text style={styles.nextButtonText}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontFamily: 'PopinsMedium',
        textAlign: 'center',
        marginVertical: 20,
        flex: 0.1,
    },
    listContainer: {
        flexGrow: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarItem: {
        margin: 10,
    },
    avatarContainer: {
        borderWidth: 1,
        borderRadius: 10,
    },
    avatarImage: {
        width: 100,
        height: 100,
        margin: 5,
    },
    checkBadge: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: -5,
        right: -5,
        backgroundColor: '#3444F1',
        padding: 5,
        borderRadius: 50,
        zIndex: 1,
    },
    nextButton: {
        padding: 20,
        alignItems: 'center',
        width: 300,
        borderRadius: 26,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttomView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 100
    },
});

export default AvatarScreen;