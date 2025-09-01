// 🦶 Footer Component
// Site footer with links, social media, and company information

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🎯 Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 🏪 Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ShopVerse</span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Your premium online shopping destination. Discover amazing products 
                with fast delivery and exceptional customer service.
              </p>
              
              {/* 📱 Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 🔗 Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/products" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=electronics" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=clothing" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=home" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/deals" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Special Deals
                  </Link>
                </li>
              </ul>
            </div>

            {/* 🏢 Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shipping" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/returns" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/track-order" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 📞 Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p>123 Shopping Street</p>
                    <p>Commerce City, CC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">support@shopverse.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔒 Trust Indicators */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* 🛡️ Security & Trust Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Secure Shopping</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-300">Fast Delivery</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-300">Secure Payment</span>
              </div>
            </div>

            {/* 💳 Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-xs text-white flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded text-xs text-white flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-blue-400 to-blue-500 rounded text-xs text-white flex items-center justify-center font-bold">
                  AMEX
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-xs text-white flex items-center justify-center font-bold">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⚖️ Legal & Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 ShopVerse. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
