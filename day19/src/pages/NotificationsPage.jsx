import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Heart, MessageCircle, UserPlus, Settings, MoreHorizontal } from 'lucide-react'
import { useNotification } from '../context/NotificationContext'

const NotificationsPage = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotification()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'likes', label: 'Likes' },
    { id: 'comments', label: 'Comments' },
    { id: 'follows', label: 'Follows' }
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const timeAgo = (timestamp) => {
    const now = new Date()
    const notifTime = new Date(timestamp)
    const diffInMs = now - notifTime
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays}d ago`
    } else if (diffInHours > 0) {
      return `${diffInHours}h ago`
    } else {
      return `${diffInMinutes}m ago`
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'likes') return notification.type === 'like'
    if (filter === 'comments') return notification.type === 'comment'
    if (filter === 'follows') return notification.type === 'follow'
    return true
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Mark all as read
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6"
      >
        <div className="flex items-center space-x-1 p-2 overflow-x-auto">
          {filters.map(({ id, label }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filter === id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{label}</span>
              {id === 'unread' && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => !notification.read && markAsRead(notification.id)}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-all ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{timeAgo(notification.timestamp)}</span>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  {notification.user && (
                    <p className="text-xs text-gray-500 mt-1">
                      From: {notification.user}
                    </p>
                  )}

                  {!notification.read && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-blue-600 font-medium">New</span>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {notification.user && (
                  <img
                    src="/api/placeholder/40/40"
                    alt={notification.user}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'When you get notifications, they\'ll show up here.'
                : `You don't have any ${filter} notifications at the moment.`
              }
            </p>
            {filter !== 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                View All Notifications
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Clear All Button */}
      {filteredNotifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearNotifications}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear All Notifications
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default NotificationsPage
