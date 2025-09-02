import React, { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  // Simulate some initial notifications
  useEffect(() => {
    const initialNotifications = [
      {
        id: 1,
        type: 'like',
        message: 'Sarah liked your post',
        user: 'Sarah Johnson',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        read: false
      },
      {
        id: 2,
        type: 'comment',
        message: 'Mike commented on your post',
        user: 'Mike Wilson',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false
      },
      {
        id: 3,
        type: 'follow',
        message: 'Alex started following you',
        user: 'Alex Chen',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true
      }
    ]
    setNotifications(initialNotifications)
    setUnreadCount(initialNotifications.filter(n => !n.read).length)
  }, [])

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
