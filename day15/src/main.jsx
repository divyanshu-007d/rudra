// Day 15: React + Auth - Main Application Entry Point
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import './index.css'

// Home/Landing Page Component
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to AuthApp 🚀
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A complete full-stack authentication system built with React and modern web technologies. 
          Experience secure user management, protected routes, and seamless authentication flow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Account
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">JWT-based authentication with secure password hashing and session management.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Modern Tech Stack</h3>
            <p className="text-gray-600">Built with React, Vite, Tailwind CSS, and Context API for state management.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Protected Routes</h3>
            <p className="text-gray-600">Route protection and user authorization with seamless navigation experience.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">🤔</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

// Main App Component with Routing
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)