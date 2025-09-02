import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage'
import NotificationsPage from './pages/NotificationsPage'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import { NotificationProvider } from './context/NotificationContext'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('socialUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('socialUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('socialUser')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <UserProvider value={{ user, onLogout: handleLogout }}>
      <PostProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile/:userId?" element={<ProfilePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </Router>
        </NotificationProvider>
      </PostProvider>
    </UserProvider>
  )
}

export default App
