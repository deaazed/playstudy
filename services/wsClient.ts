import { useRef } from 'react';

const Websocket = () => {
    const url = 'http://localhost:8080';
    return useRef(new WebSocket(url)).current;
}

export default Websocket();