// 💬 Chat Context
// Manages chat state, messages, rooms, and user interactions

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSocket } from './SocketContext';

const ChatContext = createContext();

// 📊 Chat action types
const CHAT_ACTIONS = {
  SET_ROOMS: 'SET_ROOMS',
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_ROOM_USERS: 'SET_ROOM_USERS',
  SET_TYPING_USERS: 'SET_TYPING_USERS',
  ADD_TYPING_USER: 'ADD_TYPING_USER',
  REMOVE_TYPING_USER: 'REMOVE_TYPING_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// 🔄 Chat reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_ACTIONS.SET_ROOMS:
      return { ...state, rooms: action.payload, loading: false };
    
    case CHAT_ACTIONS.SET_CURRENT_ROOM:
      return { 
        ...state, 
        currentRoom: action.payload,
        messages: [],
        typingUsers: []
      };
    
    case CHAT_ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload };
    
    case CHAT_ACTIONS.ADD_MESSAGE:
      return { 
        ...state, 
        messages: [...state.messages, action.payload]
      };
    
    case CHAT_ACTIONS.SET_ROOM_USERS:
      return { ...state, roomUsers: action.payload };
    
    case CHAT_ACTIONS.SET_TYPING_USERS:
      return { ...state, typingUsers: action.payload };
    
    case CHAT_ACTIONS.ADD_TYPING_USER:
      return { 
        ...state, 
        typingUsers: [...state.typingUsers.filter(user => user.userId !== action.payload.userId), action.payload]
      };
    
    case CHAT_ACTIONS.REMOVE_TYPING_USER:
      return { 
        ...state, 
        typingUsers: state.typingUsers.filter(user => user.userId !== action.payload)
      };
    
    case CHAT_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case CHAT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};

// 🏠 Initial state
const initialState = {
  rooms: [],
  currentRoom: null,
  messages: [],
  roomUsers: [],
  typingUsers: [],
  loading: true,
  error: null
};

export const ChatProvider = ({ children, user }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { socket, isConnected, emitEvent, addListener, removeListener } = useSocket();

  // 🎧 Setup socket event listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    // 🏠 Room-related events
    const handleRoomsList = (rooms) => {
      dispatch({ type: CHAT_ACTIONS.SET_ROOMS, payload: rooms });
    };

    const handleJoinedRoom = (roomData) => {
      dispatch({ type: CHAT_ACTIONS.SET_CURRENT_ROOM, payload: roomData.roomId });
      dispatch({ type: CHAT_ACTIONS.SET_MESSAGES, payload: roomData.messages || [] });
    };

    const handleRoomUsers = (users) => {
      dispatch({ type: CHAT_ACTIONS.SET_ROOM_USERS, payload: users });
    };

    // 💬 Message-related events
    const handleNewMessage = (message) => {
      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });
    };

    // ⌨️ Typing-related events
    const handleUserTyping = (userData) => {
      dispatch({ type: CHAT_ACTIONS.ADD_TYPING_USER, payload: userData });
    };

    const handleUserStopTyping = (userData) => {
      dispatch({ type: CHAT_ACTIONS.REMOVE_TYPING_USER, payload: userData.userId });
    };

    // 👥 User events
    const handleUserJoinedRoom = (data) => {
      // Add system message for user joining
      const systemMessage = {
        id: Date.now(),
        type: 'system',
        text: `${data.user.name} joined the room`,
        timestamp: new Date()
      };
      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: systemMessage });
    };

    const handleUserLeft = (data) => {
      // Add system message for user leaving
      const systemMessage = {
        id: Date.now(),
        type: 'system',
        text: `${data.userName} left the room`,
        timestamp: new Date()
      };
      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: systemMessage });
      
      // Remove from typing users
      dispatch({ type: CHAT_ACTIONS.REMOVE_TYPING_USER, payload: data.userId });
    };

    // 📝 Register event listeners
    addListener('rooms_list', handleRoomsList);
    addListener('joined_room', handleJoinedRoom);
    addListener('room_users', handleRoomUsers);
    addListener('new_message', handleNewMessage);
    addListener('user_typing', handleUserTyping);
    addListener('user_stop_typing', handleUserStopTyping);
    addListener('user_joined_room', handleUserJoinedRoom);
    addListener('user_left', handleUserLeft);

    // 🧹 Cleanup listeners on unmount
    return () => {
      removeListener('rooms_list', handleRoomsList);
      removeListener('joined_room', handleJoinedRoom);
      removeListener('room_users', handleRoomUsers);
      removeListener('new_message', handleNewMessage);
      removeListener('user_typing', handleUserTyping);
      removeListener('user_stop_typing', handleUserStopTyping);
      removeListener('user_joined_room', handleUserJoinedRoom);
      removeListener('user_left', handleUserLeft);
    };
  }, [socket, isConnected, addListener, removeListener]);

  // 🏠 Join a specific room
  const joinRoom = (roomId) => {
    if (emitEvent('join_room', roomId)) {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: true });
    }
  };

  // 💬 Send a message
  const sendMessage = (text, type = 'text') => {
    if (!text.trim() || !state.currentRoom) return false;
    
    const messageData = {
      text: text.trim(),
      type,
      timestamp: new Date()
    };
    
    return emitEvent('send_message', messageData);
  };

  // ⌨️ Start typing indicator
  const startTyping = () => {
    if (state.currentRoom) {
      emitEvent('typing_start');
    }
  };

  // ⌨️ Stop typing indicator
  const stopTyping = () => {
    if (state.currentRoom) {
      emitEvent('typing_stop');
    }
  };

  // 📸 Upload file/image
  const uploadFile = (fileData) => {
    if (state.currentRoom) {
      return emitEvent('upload_file', fileData);
    }
    return false;
  };

  // 😀 React to message
  const reactToMessage = (messageId, emoji) => {
    if (state.currentRoom) {
      return emitEvent('react_message', { messageId, emoji });
    }
    return false;
  };

  // 🔄 Refresh rooms list
  const refreshRooms = () => {
    emitEvent('get_rooms');
  };

  // 👥 Get current room users
  const getRoomUsers = () => {
    emitEvent('get_room_users');
  };

  const value = {
    // State
    rooms: state.rooms,
    currentRoom: state.currentRoom,
    messages: state.messages,
    roomUsers: state.roomUsers,
    typingUsers: state.typingUsers,
    loading: state.loading,
    error: state.error,
    isConnected,
    
    // Actions
    joinRoom,
    sendMessage,
    startTyping,
    stopTyping,
    uploadFile,
    reactToMessage,
    refreshRooms,
    getRoomUsers
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// 🎯 Custom hook to use chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
