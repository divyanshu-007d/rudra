// 🔐 Login Screen Component
// User authentication and name entry for chat

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Globe, User, Mail } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // 🎨 Generate random avatar URL
  const generateAvatar = (name) => {
    const colors = ['0ea5e9', '8b5cf6', 'f59e0b', 'ef4444', '10b981', 'ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor}&color=fff&size=128`;
  };

  // 📝 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);

    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userData = {
      name: formData.name.trim(),
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@chat.app`,
      avatar: formData.avatar || generateAvatar(formData.name),
      id: Date.now(),
      joinedAt: new Date()
    };

    onLogin(userData);
  };

  // 🔄 Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate avatar when name changes
      ...(name === 'name' && { avatar: generateAvatar(value) })
    }));
  };

  // 🎲 Generate random name for quick start
  const generateRandomName = () => {
    const adjectives = ['Cool', 'Smart', 'Happy', 'Brave', 'Kind', 'Swift', 'Bright', 'Bold'];
    const nouns = ['Tiger', 'Eagle', 'Dolphin', 'Lion', 'Phoenix', 'Wolf', 'Fox', 'Hawk'];
    const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    
    setFormData(prev => ({
      ...prev,
      name: randomName,
      avatar: generateAvatar(randomName)
    }));
  };

  return (
    <div className="min-h-screen chat-gradient flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* 🎨 Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white space-y-8"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 mb-6"
            >
              <MessageCircle className="w-12 h-12" />
              <h1 className="text-4xl font-bold">ChatRoom</h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 leading-relaxed"
            >
              Connect with people around the world in real-time. Share thoughts, 
              exchange ideas, and build meaningful conversations.
            </motion.p>
          </div>

          {/* ✨ Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 flex-shrink-0" />
              <span>Real-time messaging</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 flex-shrink-0" />
              <span>Multiple chat rooms</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 flex-shrink-0" />
              <span>Global community</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 flex-shrink-0" />
              <span>Emoji reactions</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 📝 Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Chat</h2>
            <p className="text-gray-600">Enter your details to start chatting</p>
          </div>

          {/* 🖼️ Avatar Preview */}
          {formData.name && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6"
            >
              <img
                src={formData.avatar}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg"
              />
              <p className="text-sm text-gray-600">Your avatar preview</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 👤 Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Display Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus-chat"
                  required
                />
              </div>
              <button
                type="button"
                onClick={generateRandomName}
                className="text-sm text-chat-primary hover:text-chat-secondary transition-colors"
              >
                Generate random name
              </button>
            </div>

            {/* 📧 Email Input (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus-chat"
                />
              </div>
            </div>

            {/* 🚀 Submit Button */}
            <motion.button
              type="submit"
              disabled={!formData.name.trim() || isLoading}
              className="w-full bg-chat-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-chat-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              whileHover={{ scale: formData.name.trim() && !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chatting</span>
                </>
              )}
            </motion.button>
          </form>

          {/* 📋 Quick Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              By joining, you agree to be respectful and kind to other users. 
              Your conversations are not stored permanently.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
