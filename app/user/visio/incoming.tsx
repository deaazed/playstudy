import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Import the 'Image' component from 'react-native'
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import AvatarImage from '@/components/AvatarImage';
import { getRoom } from '@/models/room';
import { getUser } from '@/models';

const IncommingScreen = () => {
    const params = useLocalSearchParams();
    const [caller, setCaller] = React.useState<Parse.Object | null>(null);
    const [isGroup, setIsGroup] = React.useState<boolean>(true);

    React.useEffect(() => {
        if(params.caller) {
            getUser(params.caller as string).then((user) => {
                if(user) setCaller(user);
                setIsGroup(params.isGroup === 'true');
            });
        }
    }, []);

    const handleQuit = () => {
        router.back();
    }

    const handleProcessCall = () => {
        router.push({ pathname: "/user/visio/" + params.room, params: { isCaller: 'false' } });
    }

    return (
        <View style={styles.container}>
            {/* FaceTime content */}
            <View style={styles.content}>
                {caller && !isGroup && (
                    <>
                        <AvatarImage size={100} avatar={caller?.get('avatar')} style={styles.avatar}/>
                        <Text style={styles.callerName}>{caller?.get('username')}</Text>
                    </>
                )}
                <Text style={styles.text}>Appel entrant...</Text>
            </View>
            
            {/* Close button */}
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleQuit()} style={styles.closeButton}>
                    <Feather name="phone-call" color="white" size={30} />
                </TouchableOpacity>

                {/* Volume icon */}
                <TouchableOpacity onPress={() => handleProcessCall()} style={styles.volumeIcon}>
                    <Feather name="phone-call" color="white" size={30} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    closeButton: {
        padding: 16,
        borderRadius: 50,
        backgroundColor: 'rgba(90, 25, 1, 0.3)',
    },
    actionButtons: {
        bottom: 50,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    volumeIcon: {
        padding: 16,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    cameraContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 0,
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10
    },
    camera: {
        width: 100,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    screen: {
        width: '100%',
        height: '100%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    callerName: {
        fontSize: 24,
        color: 'white',
        marginBottom: 10
    }
});

export default IncommingScreen;