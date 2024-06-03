import { View, Text as DefaulText, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from "../components/Themed";
import { User } from "../services/Interfaces";
import ProfileForme from '../assets/images/forme-inverted.svg';
import AvatarImage from "./AvatarImage";
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import HorizontalDivider from "./HorizontalDivider";
import { router } from "expo-router";
import React from "react";

export default function UserProfile({ user }: { user: User | undefined}) {
    const defaultAvatarImageSource = require('../assets/images/notFoundUserImage.png');
    function handleGoMessage(): void {
        router.push(`/user/message/${user?.id}`);
    }
    function handleGoVisio(): void {
        router.push(`/user/visio/${user?.id}`);
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <ScrollView style={{flex: 1, width: "100%"}}>
        <View style={styles.container}>
            <View style={styles.forme}>
                <ProfileForme width={470} height={520} style={{ top: -225 }}/>
            </View>
            <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', alignContent: 'flex-start', alignItems: 'center', gap: 20, marginVertical: 10}}>
                    <View style={styles.avatar}>
                        <AvatarImage size={100} avatarImageSource={user?.avatarImage ?? defaultAvatarImageSource}/>
                    </View>
                    <View style={{top: -10, justifyContent: 'flex-start'}}>
                        <Text style={{ fontFamily: 'PopinsMedium', fontSize: 16, color: "#263238" }}>{user?.name}</Text>
                        <Text style={{ fontFamily: 'PopinsRegular', fontSize: 13, color: "#898989" }}>{user?.disponibility}</Text>
                    </View>
                </View>
                <HorizontalDivider width={'90%'} borderWidth={0.5} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PopinsBold', fontSize: 17, color: "#263238" }}>5</Text>
                        <Text style={{ fontFamily: 'PopinsRegular', fontSize: 10, color: "#898989" }}>Nombre de visios</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PopinsBold', fontSize: 17, color: "#263238" }}>10</Text>
                        <Text style={{ fontFamily: 'PopinsRegular', fontSize: 10, color: "#898989" }}>Nombre de badges</Text>
                    </View>
                </View>
                <View style={{ padding: 20, borderColor: '#cecece', borderWidth: 0.5, borderRadius: 6 }}>
                    <Text style={{ fontFamily: 'PopinsMedium', fontSize: 16, color: "#898989" }}>Description</Text>
                    <Text style={{ fontFamily: 'PopinsRegular', fontSize: 12, color: "#263238" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ex id nisl lacinia lacinia. Nullam auctor, nunc id tincidunt lacinia, nisl nunc lacinia nunc, id lacinia nunc nisl auctor nunc. Sed auctor, nunc id tincidunt lacinia, nisl nunc lacinia nunc, id lacinia nunc nisl auctor nunc.</Text>
                </View>
                <View style={{ padding: 20, marginTop: 20, borderColor: '#cecece', borderWidth: 0.5, borderRadius: 6}}>
                    <Text style={{ fontFamily: 'PopinsMedium', fontSize: 16, color: "#898989" }}>Que voulez-vous faire ?</Text>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => handleGoMessage()} style={styles.optionContainer}>
                                <View style={[styles.iconeAction, { backgroundColor: "#3444F1" }]}>
                                    <FontAwesome name="comment" size={24} color="#fff" />
                                    </View>
                                <Text style={styles.optionText}>Envoyer un message</Text>
                                <FontAwesome name="chevron-right" size={14} color="#cecece" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGoVisio()} style={styles.optionContainer}>
                                <View style={[styles.iconeAction, { backgroundColor: "#1FFF35" }]}>
                                    <FontAwesome name="video" size={24} color="#fff" />
                                </View>
                                <Text style={styles.optionText}>Faire une visio</Text>
                                <FontAwesome name="chevron-right" size={14} color="#cecece" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 20, flexDirection: 'column', marginVertical: 20, borderColor: '#cecece', borderWidth: 0.5, borderRadius: 6 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.buttonText, { color: '#3444F1' }]}>Ajouter en ami</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.buttonText, { color: '#FF0000' }]}>Bloquer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
    },
    forme: {
      position: 'absolute',
      width: '100%',
      top: 0,
      right: 0
    },
    avatar: {
      alignItems:"center",
    },
    avatarImage: {
      height: 100,
      width: 100,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#000",
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    optionText: {
        fontFamily: 'PopinsMedium',
        fontSize: 16,
        color: "#263238",
        marginLeft: 10,
        width: '80%'
    },
    iconeAction: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 6,
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'PopinsMedium',
        fontSize: 16
    }
});
