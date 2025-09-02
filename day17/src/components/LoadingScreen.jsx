// ⏳ Loading Screen Component
// Beautiful loading animation while establishing socket connection

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Wifi, Users, Zap } from 'lucide-react';

const LoadingScreen = ({ message = "Connecting to chat..." }) => {
  // 🌊 Animation variants for different elements
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // 🎨 Loading dots animation
  const dotVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen chat-gradient flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center text-white max-w-md w-full relative"
      >
        {/* 🚀 Main Logo with Pulse Animation */}
        <motion.div
          variants={pulseVariants}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20"
            >
              <MessageCircle className="w-16 h-16" />
            </motion.div>
            
            {/* ⚡ Connection Status Icons */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <div className="bg-green-500 rounded-full p-2">
                <Wifi className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 📱 App Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl font-bold mb-2">ChatRoom</h1>
          <p className="text-xl opacity-90">Real-time conversations</p>
        </motion.div>

        {/* 💫 Loading Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg mb-4">{message}</p>
          
          {/* 🔄 Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={dotVariants}
                animate="animate"
                style={{ animationDelay: `${i * 0.2}s` }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* ✨ Feature Preview Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Instant</p>
            <p className="text-xs opacity-75">Real-time messaging</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Social</p>
            <p className="text-xs opacity-75">Connect globally</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <MessageCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Rooms</p>
            <p className="text-xs opacity-75">Multiple channels</p>
          </motion.div>
        </motion.div>

        {/* 🔄 Connection Progress */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="bg-white h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: ["0%", "60%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.p 
            className="text-sm opacity-75"
            animate={{
              opacity: [0.75, 1, 0.75]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Preparing your chat experience...
          </motion.p>
        </motion.div>

        {/* 🌟 Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// 🎯 Different loading states
export const ConnectingScreen = () => (
  <LoadingScreen message="Establishing secure connection..." />
);

export const JoiningRoomScreen = ({ roomName }) => (
  <LoadingScreen message={`Joining ${roomName}...`} />
);

export const ReconnectingScreen = () => (
  <LoadingScreen message="Reconnecting to chat..." />
);

export default LoadingScreen;
