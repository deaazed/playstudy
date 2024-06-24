import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FaceTimeScreen = () => {
    const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
                <Text style={styles.text}>FaceTime Screen</Text>
            </View>

            <View style={styles.cameraContainer}>
                <CameraView style={styles.camera} facing={'front'} />
            </View>
            
            {/* Close button */}
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
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
});

export default FaceTimeScreen;