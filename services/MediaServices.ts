import { BACK4APP_SERVER_URL, WEBSOCKET_URL } from '@/constants/Config';
import {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	MediaStream,
	MediaStreamTrack,
	mediaDevices
} from 'react-native-webrtc';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';

export const websocket = new WebSocket(BACK4APP_SERVER_URL);

export class WebRTCService {
    mediaConstraints : MediaStreamConstraints = {
        audio: true,
        video: {
            frameRate: 30,
            facingMode: 'user'
        }
    }
    peerConstraints : RTCConfiguration = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    };
    sessionConstraints : {} = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true
        }
    };
    localMediaStream : MediaStream | null = null;
    remoteMediaStream : MediaStream | null = null;
    isVoiceOnly : boolean = false;
    isFrontCamera : boolean = true;
    private roomId : string = '';
    private isCaller : boolean = false;
    private websocket : WebSocket | null = null;
    private remoteCandidates : RTCIceCandidate[] = [];
    peerConnection : RTCPeerConnection | null = null;
    private dataChannel : RTCDataChannel | undefined;
    private hasOffered : boolean = false;

    async init( roomId : string, isCaller : boolean, websocket : WebSocket) {
        this.roomId = roomId;
        this.isCaller = isCaller;
        this.websocket = websocket;
        await this.createPeerConnection();
        return this;
    }

    private async createPeerConnection() {
        this.peerConnection = new RTCPeerConnection( this.peerConstraints );
        this.localMediaStream = await this.getLocalMediaStream() as MediaStream;
        this.localMediaStream?.getTracks().forEach( ( track : MediaStreamTrack ) => this.peerConnection?.addTrack( track, this.localMediaStream as MediaStream ) );

        this.websocket?.addEventListener( 'message', event => {
            const message = JSON.parse( event.data );
            console.log( 'Received message:', message.type, message);
            this.handleRemoteMessage( message );
        } );

        let _websocket: WebSocket | null = this.websocket;
        
        this.peerConnection.addEventListener( 'connectionstatechange', event => {
            switch( this.peerConnection?.connectionState ) {
                case 'closed':
                    // You can handle the call being disconnected here.
                    this.destroy();
                    break;
            };
        } );
        
        this.peerConnection.addEventListener( 'icecandidate', event => {
            // When you find a null candidate then there are no more candidates.
            // Gathering of candidates has finished.
            if ( !event.candidate ) { return; };
        
            // Send the event.candidate onto the person you're calling.
            this.websocket?.send( JSON.stringify( { type: 'candidate', room: this.roomId, candidate: event.candidate } ) );
            // Keeping to Trickle ICE Standards, you should send the candidates immediately.
        } );
        
        this.peerConnection.addEventListener( 'icecandidateerror', event => {
            // You can ignore some candidate errors.
            // Connections can still be made even when errors occur.
        } );
        
        this.peerConnection.addEventListener( 'iceconnectionstatechange', event => {
            switch( this.peerConnection?.iceConnectionState ) {
                case 'connected':
                case 'completed':
                    // You can handle the call being connected here.
                    break;
            };
        } );
        
        this.peerConnection.addEventListener( 'negotiationneeded', event => {
            // You can start the offer stages here.
            console.log(this.isCaller, 'Negotiation Needed');
            _websocket?.addEventListener('open', () => {
                console.log('WebSocket Connected');
                _websocket?.send( JSON.stringify( { type: 'negotiationneeded', room : this.roomId } ) );
            });
            if(_websocket?.readyState) _websocket?.send( JSON.stringify( { type: 'negotiationneeded', room : this.roomId } ) );
        } );
        
        this.peerConnection.addEventListener( 'signalingstatechange', event => {
            switch( this.peerConnection?.signalingState ) {
                case 'stable':
                    // You can handle the call being stable here.
        
                    break;
                case 'closed':
                    // You can handle the call being disconnected here.
        
                    break;
            };
        } );
        
        this.peerConnection.addEventListener( 'track', event => {
            // Grab the remote track from the connected participant.
            this.remoteMediaStream = this.remoteMediaStream || new MediaStream();
            this.remoteMediaStream.addTrack( event.track as MediaStreamTrack );
            console.log('Remote Stream:', this.remoteMediaStream?.toURL());
        } );
    }

    private destroyPeerConnection() {
        this.peerConnection?.close();
        this.peerConnection = null;
    }

    private async getLocalMediaStream() : Promise<MediaStream | undefined> {
        try {
            const mediaStream = await mediaDevices.getUserMedia( this.mediaConstraints );
        
            if ( this.isVoiceOnly ) {
                let videoTrack = mediaStream.getVideoTracks()[ 0 ];
                videoTrack.enabled = false;
            };
        
            return mediaStream;
        } catch( err ) {
            // Handle Error
        };
        
        return undefined;
    }

    getStreamURL(type : string = "local") : string | undefined {
        let url = type === "remote" ? this.remoteMediaStream?.toURL() : this.localMediaStream?.toURL();
        return url;
    }

    private destroyLocalMediaStream() {
        this.localMediaStream?.getTracks().forEach( track => track.stop() );
        this.localMediaStream = null;
    }

    private handleRemoteCandidate(iceCandidate : RTCIceCandidate) {
        console.log('remoteCandidates', this.remoteCandidates);
        iceCandidate = new RTCIceCandidate( iceCandidate );

        if ( this.peerConnection?.remoteDescription == null ) {
            return this.remoteCandidates.push( iceCandidate );
        };


        return this.peerConnection?.addIceCandidate( iceCandidate );
    }

    private async setLocalOffer() : Promise<any | undefined> {
        try {
            const offerDescription = await this.peerConnection?.createOffer( this.sessionConstraints );
            await this.peerConnection?.setLocalDescription( offerDescription );
            
            return offerDescription;
            // Send the offerDescription to the other participant.
        } catch( err ) {
            // Handle Errors
        };
        return undefined;
    }

    private async handleRemoteOffer(offer : RTCSessionDescription) {
        try {
            console.log('Received Offer');
            // Use the received offerDescription
            const offerDescription = new RTCSessionDescription( offer );
            await this.peerConnection?.setRemoteDescription( offerDescription );
        
            const answerDescription = await this.peerConnection?.createAnswer();
            await this.peerConnection?.setLocalDescription( answerDescription );
        
            // Here is a good place to process candidates.
            this.processCandidates();
        
            // Send the answerDescription back as a response to the offerDescription.

            this.websocket?.send( JSON.stringify( { type: 'answer', room : this.roomId, isCaller: this.isCaller, answer : answerDescription } ) );
        } catch( err ) {
            // Handle Errors
        };
    }

    private handleRemoteAnswer(answer : RTCSessionDescription) {
        this.peerConnection?.setRemoteDescription( answer );
    }

    async handleRemoteMessage(message: any) {
        switch (message.type) {
            case 'candidate':
            const exists =  this.remoteCandidates.includes(message.candidate);
            console.log('Can Candidate', message.room == this.roomId && !exists);
            if(message.room == this.roomId && !exists) this.handleRemoteCandidate(message.candidate);
            break;
            case 'offer':
            console.log('Received Offer');
            console.log('Can Answer', this.isCaller);
            if(this.isCaller && message.room == this.roomId) await this.handleRemoteOffer(message.offer);
            break;
            case 'answer':
            if(!this.isCaller && message.room == this.roomId) this.handleRemoteAnswer(message.answer);
            break;
            case 'negotiationneeded':
            console.log('negotiation accorded',message.room  === this.roomId, message.room, this.roomId);
            if (message.room == this.roomId ) {
                console.log('Can offer', !this.hasOffered && !this.isCaller);
                if ( !this.hasOffered && !this.isCaller ) {
                    this.setLocalOffer().then( offer => {
                        this.websocket?.send( JSON.stringify( { type: 'offer', room : this.roomId, offer: offer } ) );
                        this.hasOffered = true;
                    } );
                }
            }
            break;
        }
    }

    private processCandidates() {
        if ( this.remoteCandidates.length < 1 ) { return; };

        this.remoteCandidates.map( candidate => this.peerConnection?.addIceCandidate( candidate ) );
        this.remoteCandidates = [];
    }

    private destroyChannel() {
        this.dataChannel?.close();
        this.dataChannel = undefined;
    }

    switchCamera() {
        // const videoTrack = this.localMediaStream?.getTracks();
        console.log(this.localMediaStream);
        
        // videoTrack?._switchCamera();

        // this.isFrontCamera = !this.isFrontCamera;
    }

    destroy() {
        this.destroyChannel();
        this.destroyPeerConnection();
        this.destroyLocalMediaStream();
    }
}