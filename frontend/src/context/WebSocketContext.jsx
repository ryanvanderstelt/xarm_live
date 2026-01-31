import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, url }) => {
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        console.log('Attempting WebSocket connection to:', url); // ADD
        const websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log('✅ WebSocket connected');
            setIsConnected(true);
        };

        websocket.onerror = (error) => {  // ADD
            console.error('❌ WebSocket error:', error);
        };

        websocket.onclose = (event) => {  // MODIFY
            console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
            setIsConnected(false);
        };

        setWs(websocket);

        return () => websocket.close();
    }, [url]);

    return (
        <WebSocketContext.Provider value={{ ws, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (handlers) => {
    const { ws, isConnected } = useContext(WebSocketContext);

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('📦 Received keys:', Object.keys(data));

            // Check which keys exist and call appropriate handler
            for (const [key, handler] of Object.entries(handlers)) {
                if (key in data) {
                    handler(data);
                    break; // Stop after first match
                }
            }
        };

        ws.addEventListener('message', handleMessage);
        return () => ws.removeEventListener('message', handleMessage);
    }, [ws, handlers]);

    return { ws, isConnected };
};