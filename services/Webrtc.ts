import { BACK4APP_SERVER_URL } from '@/constants/Config';
import { useRef, useEffect } from 'react';
import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';

const rtc  = () => {
    const websocket = new WebSocket(BACK4APP_SERVER_URL);
    // let peerConnection : RTCPeerConnection | null = null;

    // // Initialize the peer connection
    // peerConnection = new RTCPeerConnection();

    // // Handle incoming signaling messages from the server
    // websocket.onmessage = (event) => {
    //     const message = JSON.parse(event.data);

    //     if (message.type === 'offer') {
    //         handleOffer(message);
    //     } else if (message.type === 'answer') {
    //         handleAnswer(message);
    //     } else if (message.type === 'candidate') {
    //         handleCandidate(message);
    //     }
    // };

    // // Handle connection state changes
    // peerConnection.oniceconnectionstatechange = () => {
    //     const iceConnectionState = peerConnection?.iceConnectionState;
    //     console.log('ICE connection state:', iceConnectionState);
    // };

    // const handleOffer = async (offer: RTCSessionDescription) => {
    //     // Set the remote description
    //     await peerConnection.current?.setRemoteDescription(offer);

    //     // Create an answer
    //     const answer = await peerConnection.current?.createAnswer();

    //     // Set the local description
    //     await peerConnection.current?.setLocalDescription(answer);

    //     // Send the answer to the server
    //     websocket.send(JSON.stringify(answer));
    // };

    // const handleAnswer = async (answer: RTCSessionDescription) => {
    //     // Set the remote description
    //     await peerConnection.current?.setRemoteDescription(answer);
    // };

    // const handleCandidate = (candidate: RTCIceCandidate) => {
    //     // Add the ICE candidate to the peer connection
    //     peerConnection?.addIceCandidate(candidate);
    // };

    return { websocket };
};

const webRTC = rtc();

export default webRTC;