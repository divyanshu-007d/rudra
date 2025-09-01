// 🔌 Socket.io Context
// Manages real-time WebSocket connection and events

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children, user }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    // 🔗 Initialize Socket.io connection
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });

    // 🎯 Connection event handlers
    newSocket.on('connect', () => {
      console.log('🔗 Connected to server:', newSocket.id);
      setIsConnected(true);
      setConnectionError(null);
      
      // Join chat with user info
      if (user) {
        newSocket.emit('join_chat', user);
      }
    });

    newSocket.on('disconnect', (reason) => {
      console.log('📤 Disconnected from server:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
    });

    // 🎉 User joined confirmation
    newSocket.on('user_joined', (userData) => {
      console.log('👤 User joined:', userData);
    });

    setSocket(newSocket);

    // 🧹 Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user]);

  // 📤 Emit event wrapper with error handling
  const emitEvent = (event, data) => {
    if (socket && isConnected) {
      socket.emit(event, data);
      return true;
    } else {
      console.warn(`Cannot emit ${event}: Socket not connected`);
      return false;
    }
  };

  // 👂 Add event listener wrapper
  const addListener = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  // 🔇 Remove event listener wrapper
  const removeListener = (event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  const value = {
    socket,
    isConnected,
    connectionError,
    emitEvent,
    addListener,
    removeListener
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

// 🎯 Custom hook to use socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
