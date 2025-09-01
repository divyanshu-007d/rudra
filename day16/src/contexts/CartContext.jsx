// 🛒 Shopping Cart Context
// Manages cart state, items, and cart operations globally

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// 📊 Cart action types for reducer
const CART_ACTIONS = {
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING'
};

// 🔄 Cart reducer to manage state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        // If item exists, increase quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      // If new item, add to cart
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
};

// 🛒 Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });

  // 📥 Load cart on component mount
  useEffect(() => {
    loadCart();
  }, []);

  // 🔄 Load cart from backend/localStorage
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Try to load from backend first
      const response = await axios.get('/api/cart');
      dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data });
    } catch (error) {
      // Fallback to localStorage if backend fails
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: JSON.parse(savedCart) });
      }
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // ➕ Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post('/api/cart', { productId, quantity });
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { productId, quantity, id: Date.now() } });
      
      // Save to localStorage as backup
      const updatedCart = [...state.items, { productId, quantity, id: Date.now() }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true, message: 'Item added to cart!' };
    } catch (error) {
      // Fallback to local storage
      const newItem = { productId, quantity, id: Date.now() };
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: newItem });
      
      const updatedCart = [...state.items, newItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true, message: 'Item added to cart!' };
    }
  };

  // ❌ Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
      
      // Update localStorage
      const updatedCart = state.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true, message: 'Item removed from cart!' };
    } catch (error) {
      // Fallback to local operation
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
      
      const updatedCart = state.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true, message: 'Item removed from cart!' };
    }
  };

  // 🔄 Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity });
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
      
      // Update localStorage
      const updatedCart = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    } catch (error) {
      // Fallback to local operation
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
      
      const updatedCart = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    }
  };

  // 🗑️ Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    localStorage.removeItem('cart');
  };

  // 📊 Get cart statistics
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // 🎁 Context value object
  const value = {
    items: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 🎯 Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
