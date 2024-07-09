import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { WebRTCService } from '@/services/MediaServices';
import { RTCView } from 'react-native-webrtc';
import { useUsers } from '@/components/UsersContext';
import { deleteRoom, getRooms } from '@/models/room';
import { WEBSOCKET_URL } from '@/constants/Config';

const FaceTimeScreen = () => {
    const params = useLocalSearchParams();
    const { state } = useUsers();
    const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
    const [camSwitchCheck, setCamSwitchCheck] = React.useState<number>(0);
    const websocket = React.useRef(new WebSocket(WEBSOCKET_URL)).current;
    const webrtc = new WebRTCService();
    const [localStream, setLocalStream] = React.useState<any>();
    const [remoteStream, setRemoteStream] = React.useState<any>();

    React.useEffect(() => {
        new Promise(async(resolve, reject) => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            const b = await webrtc.init(params.id as string, params.isCaller === 'true', websocket);
            resolve(b);
        }).then(() => {
            setLocalStream(webrtc.getStreamURL())
            webrtc?.peerConnection?.addEventListener('track', (event) => {
                if(webrtc.remoteMediaStream && webrtc.remoteMediaStream.toURL() !== undefined) setRemoteStream(webrtc.remoteMediaStream.toURL());
            });
            console.log('Remote Stream Front:', remoteStream);
        });
    }, []);
    const handleQuit = () => {
        if(params.isCaller === 'true') {
            deleteRoom(params.id as string).then(() => {
                webrtc.destroy();
                router.back();
            });
        } else {
            router.back();
            router.back();
        }
    }

    React.useEffect(() => {
        if(camSwitchCheck > 0) webrtc.switchCamera();
        // setLocalStream(webrtc.localMediaStream?.toURL());
        console.log('Local Stream:', localStream);
        
    }, [camSwitchCheck]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* FaceTime content */}
            <View style={styles.content}>
                <RTCView
                    streamURL={remoteStream || webrtc.remoteMediaStream?.toURL()}
                    style={styles.screen}
                    objectFit={'cover'}
                    mirror={true}
                />
            </View>

            <View style={styles.cameraContainer}>
                <TouchableOpacity onPress={() => setCamSwitchCheck(camSwitchCheck + 1)}>
                    <RTCView
                        streamURL={localStream}
                        style={styles.camera}
                        objectFit={'cover'}
                        mirror={true}
                    />
                </TouchableOpacity>
            </View>
            
            {/* Close button */}
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleQuit()} style={styles.closeButton}>
                    <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>

                {/* Volume icon */}
                <TouchableOpacity style={styles.volumeIcon}>
                    <Ionicons name="volume-high" size={30} color="white" />
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
        height: '100%',
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
        bottom: 100,
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
        bottom: 10,
        right: 10,
        padding: -10,
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    camera: {
        width: 100,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20
    },
    screen: {
        width: '100%',
        height: '100%',
    },
});

export default FaceTimeScreen;