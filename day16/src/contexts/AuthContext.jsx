// 🔐 Authentication Context
// Manages user authentication, login/logout, and user session

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// 👤 Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 🚪 Login function
  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would call your auth API
      if (email && password) {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
          joinedDate: new Date().toISOString(),
          preferences: {
            notifications: true,
            newsletter: true,
            theme: 'light'
          }
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: 'Welcome back!' };
      } else {
        return { success: false, message: 'Please provide valid credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // 📝 Register function
  const register = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration - in real app, this would call your auth API
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0ea5e9&color=fff`,
        joinedDate: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: false,
          theme: 'light'
        }
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  // 🚪 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
    return { success: true, message: 'Logged out successfully!' };
  };

  // 🔄 Update user profile
  const updateProfile = async (updates) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, message: 'Profile updated successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to update profile' };
    }
  };

  // 📧 Request password reset
  const requestPasswordReset = async (email) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock password reset request
      return { 
        success: true, 
        message: 'Password reset instructions sent to your email!' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Failed to send password reset email' 
      };
    }
  };

  // 🎁 Context value object
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    requestPasswordReset,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎯 Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
