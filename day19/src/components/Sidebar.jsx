import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Users, Camera, Calendar } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Sidebar = () => {
  const { user } = useUser()

  const stats = [
    { label: 'Posts', value: user.posts, icon: Camera },
    { label: 'Followers', value: user.followers, icon: Users },
    { label: 'Following', value: user.following, icon: User }
  ]

  const quickLinks = [
    { label: 'My Profile', icon: User, to: `/profile/${user.id}` },
    { label: 'Events', icon: Calendar, to: '/events' },
    { label: 'Groups', icon: Users, to: '/groups' }
  ]

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="h-20 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center -mt-10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600 text-center mt-1">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-600">{label}</p>
              </div>
            ))}
          </div>

          <Link
            to={`/profile/${user.id}`}
            className="block w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 rounded-lg font-medium transition-colors"
          >
            View Profile
          </Link>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h4>
        <div className="space-y-2">
          {quickLinks.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
              <span className="text-gray-700 group-hover:text-blue-500">{label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Suggested Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-3">People You Might Know</h4>
        <div className="space-y-3">
          {[
            { name: 'Sarah Johnson', avatar: '/api/placeholder/40/40', mutualFriends: 12 },
            { name: 'Mike Wilson', avatar: '/api/placeholder/40/40', mutualFriends: 8 },
            { name: 'Emily Davis', avatar: '/api/placeholder/40/40', mutualFriends: 15 }
          ].map((person, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.mutualFriends} mutual friends</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
              >
                Follow
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Sidebar
