// 🛒 Main E-commerce Application Component
// Handles routing, global state, and overall app structure

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import { motion } from 'framer-motion';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* 🧭 Navigation Bar */}
            <Navbar />
            
            {/* 📱 Main Content Area */}
            <motion.main 
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                {/* 🏠 Home Page - Featured products and hero section */}
                <Route path="/" element={<Home />} />
                
                {/* 🛍️ Products Catalog - Browse all products with filters */}
                <Route path="/products" element={<Products />} />
                
                {/* 🔍 Product Details - Individual product page */}
                <Route path="/products/:id" element={<ProductDetail />} />
                
                {/* 🛒 Shopping Cart - Review items before checkout */}
                <Route path="/cart" element={<Cart />} />
                
                {/* 💳 Checkout - Payment and order completion */}
                <Route path="/checkout" element={<Checkout />} />
                
                {/* 📦 Order History - Past purchases and tracking */}
                <Route path="/orders" element={<Orders />} />
                
                {/* 👤 User Profile - Account settings and preferences */}
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </motion.main>
            
            {/* 🦶 Footer */}
            <Footer />
            
            {/* 🔔 Toast Notifications */}
            <Toast />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
