import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  MessageCircle,
  Hash
} from 'lucide-react'
import { useUser } from '../context/UserContext'
import { useNotification } from '../context/NotificationContext'

const Header = () => {
  const { user, onLogout } = useUser()
  const { unreadCount } = useNotification()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Hash, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadCount }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900">SocialHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for users, posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(({ icon: Icon, label, path, badge }) => (
                <Link
                  key={path}
                  to={path}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      isActive(path)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {badge > 9 ? '9+' : badge}
                      </span>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img
                  src={user.avatar || '/api/placeholder/32/32'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </motion.button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      onLogout()
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ icon: Icon, label, path, badge }) => (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center p-2"
            >
              <div className={`p-2 rounded-lg ${
                isActive(path)
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600'
              }`}>
                <Icon className="w-5 h-5" />
                {badge > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
