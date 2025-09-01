// 🛒 Shopping Cart Page Component
// Review cart items, update quantities, and proceed to checkout

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShoppingCart,
  Tag,
  CreditCard
} from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { 
    items: cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartItemCount,
    loading 
  } = useCart();
  
  const [products, setProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // 📥 Fetch product details for cart items
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems.length === 0) {
        setLoadingProducts(false);
        return;
      }

      try {
        setLoadingProducts(true);
        const productPromises = cartItems.map(item => 
          axios.get(`/api/products/${item.productId}`)
        );
        
        const responses = await Promise.all(productPromises);
        const productsData = {};
        
        responses.forEach(response => {
          productsData[response.data.id] = response.data;
        });
        
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
        if (window.toast) {
          window.toast.error('Failed to load cart items');
        }
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  // 🔄 Handle quantity update
  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const result = await updateQuantity(itemId, newQuantity);
    if (!result.success && window.toast) {
      window.toast.error('Failed to update quantity');
    }
  };

  // 🗑️ Handle item removal
  const handleRemoveItem = async (itemId, productTitle) => {
    const result = await removeFromCart(itemId);
    if (result.success && window.toast) {
      window.toast.success(`${productTitle} removed from cart`);
    }
  };

  // 🎟️ Handle promo code application
  const handlePromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      if (window.toast) {
        window.toast.success(`Promo code applied! ${validCodes[promoCode.toUpperCase()]}% off`);
      }
    } else if (promoCode) {
      if (window.toast) {
        window.toast.error('Invalid promo code');
      }
    }
  };

  // 💰 Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const product = products[item.productId];
    if (!product) return total;
    
    const itemPrice = product.discount > 0 
      ? product.price * (1 - product.discount / 100)
      : product.price;
    
    return total + (itemPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discountAmount + tax + shipping;

  // 🎬 Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
                ))}
              </div>
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 🔙 Back to Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </motion.div>

        {/* 🛒 Cart Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          // 🛒 Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          // 📦 Cart Contents
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 📋 Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const product = products[item.productId];
                    if (!product) return null;

                    const itemPrice = product.discount > 0 
                      ? product.price * (1 - product.discount / 100)
                      : product.price;

                    return (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        exit="exit"
                        layout
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                          
                          {/* 📸 Product Image */}
                          <Link to={`/products/${product.id}`} className="flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-24 h-24 object-cover object-center rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* 📋 Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/products/${product.id}`}
                              className="block hover:text-primary-600 transition-colors"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {product.title}
                              </h3>
                            </Link>
                            
                            <p className="text-sm text-gray-600 mb-2 capitalize">
                              Category: {product.category}
                            </p>

                            <div className="flex items-center space-x-2">
                              {product.discount > 0 ? (
                                <>
                                  <span className="text-lg font-bold text-primary-600">
                                    ${itemPrice.toFixed(2)}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    ${product.price}
                                  </span>
                                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                    -{product.discount}%
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-primary-600">
                                  ${product.price}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 🔢 Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-medium bg-gray-50">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* 🗑️ Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id, product.title)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* 💰 Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${(itemPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* 💳 Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* 🎟️ Promo Code */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-gray-900">Promo Code</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handlePromoCode}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {discount}% discount applied!
                    </p>
                  )}
                </div>

                {/* 📊 Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* 🛒 Checkout Button */}
                <Link 
                  to="/checkout"
                  className="w-full btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </Link>

                {/* 🛡️ Security Badge */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                    <span>🔒</span>
                    <span>Secure checkout powered by SSL encryption</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
