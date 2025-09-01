// 💬 Main Chat Application Component
// Real-time chat app with Socket.io integration

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatProvider } from './contexts/ChatContext';
import { SocketProvider } from './contexts/SocketContext';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('chatUser');
      }
    }
    
    // Simulate loading time for smooth UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // 🚪 Handle user login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  // 🚪 Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
  };

  // 🎬 Show loading screen initially
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {!user ? (
          // 🔐 Login Screen
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          // 💬 Chat Interface
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <SocketProvider user={user}>
              <ChatProvider user={user}>
                <ChatInterface user={user} onLogout={handleLogout} />
              </ChatProvider>
            </SocketProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
