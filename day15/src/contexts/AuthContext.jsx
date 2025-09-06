// Day 15: Authentication Context
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Auth state management
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('authToken'),
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // API base URL
  const API_BASE = 'http://localhost:3001/api';

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: data.data.user,
                token: token
              }
            });
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('authToken');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('authToken');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (identifier, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.message || 'Login failed'
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Network error. Please check your connection.'
      });
      return { success: false, error: 'Network error' };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.message || 'Registration failed'
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Network error. Please check your connection.'
      });
      return { success: false, error: 'Network error' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (state.token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({
          type: 'UPDATE_USER',
          payload: data.data.user
        });
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};