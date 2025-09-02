// 💬 Chat Interface Component
// Main chat interface with rooms, messages, and user interactions

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Users, 
  Hash, 
  Settings, 
  LogOut, 
  Smile, 
  Paperclip,
  MoreVertical,
  Circle,
  Phone,
  Video
} from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';
import { useChat } from '../contexts/ChatContext';

const ChatInterface = ({ user, onLogout }) => {
  const { isConnected, onlineUsers } = useSocket();
  const { 
    currentRoom, 
    messages, 
    rooms, 
    typingUsers, 
    sendMessage, 
    joinRoom, 
    startTyping, 
    stopTyping 
  } = useChat();
  
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // 📜 Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ⌨️ Handle message input changes with typing indicators
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    
    // Start typing indicator
    startTyping();
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 2000);
  };

  // 📤 Send message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = messageInput.trim();
    
    if (!trimmed) return;
    
    sendMessage(trimmed);
    setMessageInput('');
    stopTyping();
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // 😊 Quick emoji insertion
  const quickEmojis = ['😊', '😂', '❤️', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥'];
  
  const insertEmoji = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // 🕐 Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 🎨 Get user status color
  const getUserStatusColor = (userId) => {
    return onlineUsers.some(u => u.id === userId) ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      
      {/* 🏠 Sidebar - Rooms & Users */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        
        {/* 👤 User Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-chat-primary to-chat-secondary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <div className="flex items-center space-x-2">
                  <Circle className={`w-3 h-3 ${isConnected ? 'text-green-300' : 'text-red-300'}`} fill="currentColor" />
                  <span className="text-sm opacity-90">
                    {isConnected ? 'Online' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 🏠 Chat Rooms */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Chat Rooms
            </h4>
            <div className="space-y-2">
              {rooms.map(room => (
                <motion.button
                  key={room.id}
                  onClick={() => joinRoom(room.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentRoom === room.id 
                      ? 'bg-chat-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium"># {room.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      currentRoom === room.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {room.userCount || 0}
                    </span>
                  </div>
                  {room.description && (
                    <p className={`text-sm mt-1 ${
                      currentRoom === room.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {room.description}
                    </p>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 👥 Online Users */}
          <div className="p-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Online Users ({onlineUsers.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {onlineUsers.map(onlineUser => (
                <div key={onlineUser.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={onlineUser.avatar} 
                      alt={onlineUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {onlineUser.name}
                      {onlineUser.id === user.id && ' (You)'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {onlineUser.currentRoom && `in #${onlineUser.currentRoom}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 💬 Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* 📋 Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="w-6 h-6 text-gray-400" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {rooms.find(r => r.id === currentRoom)?.name || 'Select a room'}
                </h2>
                <p className="text-sm text-gray-500">
                  {onlineUsers.length} member{onlineUsers.length !== 1 ? 's' : ''} online
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowRoomSettings(!showRoomSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* 📨 Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => {
              const isOwn = message.userId === user.id;
              const showAvatar = index === 0 || messages[index - 1].userId !== message.userId;
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mt-4' : 'mt-1'}`}
                >
                  <div className={`flex space-x-3 max-w-xl ${isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    {/* 👤 Avatar */}
                    {showAvatar && !isOwn && (
                      <img 
                        src={message.userAvatar} 
                        alt={message.userName}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                    {showAvatar && isOwn && <div className="w-8"></div>}
                    
                    {/* 💬 Message Bubble */}
                    <div className={`rounded-2xl px-4 py-2 ${
                      isOwn 
                        ? 'bg-chat-primary text-white rounded-br-sm' 
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                    }`}>
                      {/* 👤 User Name (for others' messages) */}
                      {showAvatar && !isOwn && (
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          {message.userName}
                        </p>
                      )}
                      
                      {/* 📝 Message Text */}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      
                      {/* 🕐 Timestamp */}
                      <p className={`text-xs mt-1 ${
                        isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* ⌨️ Typing Indicators */}
          <AnimatePresence>
            {typingUsers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {typingUsers.map(u => u.name).join(', ')} 
                    {typingUsers.length === 1 ? ' is' : ' are'} typing...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ✏️ Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                placeholder={`Message #${rooms.find(r => r.id === currentRoom)?.name || 'room'}...`}
                className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-300 focus-chat resize-none max-h-32"
                disabled={!isConnected || !currentRoom}
              />
              
              {/* 🎛️ Input Actions */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* 😊 Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
                  >
                    <div className="grid grid-cols-5 gap-1">
                      {quickEmojis.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                          className="p-2 rounded hover:bg-gray-100 transition-colors text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 📤 Send Button */}
            <motion.button
              type="submit"
              disabled={!messageInput.trim() || !isConnected || !currentRoom}
              className="bg-chat-primary text-white p-3 rounded-xl hover:bg-chat-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: messageInput.trim() && isConnected && currentRoom ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
