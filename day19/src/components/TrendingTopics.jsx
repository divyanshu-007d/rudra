import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Hash, ExternalLink } from 'lucide-react'

const TrendingTopics = () => {
  const trends = [
    { tag: '#ReactDeveloper', posts: '12.5K posts' },
    { tag: '#TechNews', posts: '8.2K posts' },
    { tag: '#WebDesign', posts: '15.7K posts' },
    { tag: '#JavaScript', posts: '25.1K posts' },
    { tag: '#UIUXDesign', posts: '9.8K posts' }
  ]

  const newsItems = [
    {
      title: 'New React 19 Features Released',
      source: 'Tech Daily',
      time: '2h ago',
      image: '/api/placeholder/60/60'
    },
    {
      title: 'AI Revolution in Web Development',
      source: 'Dev News',
      time: '4h ago',
      image: '/api/placeholder/60/60'
    },
    {
      title: 'Best Practices for Modern CSS',
      source: 'Design Hub',
      time: '6h ago',
      image: '/api/placeholder/60/60'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h4 className="text-lg font-semibold text-gray-900">Trending Topics</h4>
        </div>
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-600">{trend.tag}</p>
                  <p className="text-sm text-gray-500">{trend.posts}</p>
                </div>
                <Hash className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors">
          Show more
        </button>
      </motion.div>

      {/* Latest News */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <div className="flex items-center space-x-2 mb-4">
          <ExternalLink className="w-5 h-5 text-green-500" />
          <h4 className="text-lg font-semibold text-gray-900">Latest News</h4>
        </div>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <img
                src={item.image}
                alt="News thumbnail"
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                  {item.title}
                </h5>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{item.source}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-4 text-green-500 hover:text-green-600 font-medium text-sm transition-colors">
          View all news
        </button>
      </motion.div>

      {/* Who to Follow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Who to Follow</h4>
        <div className="space-y-3">
          {[
            { name: 'Tech Influencer', handle: '@techguru', followers: '125K', avatar: '/api/placeholder/40/40' },
            { name: 'Design Pro', handle: '@designpro', followers: '89K', avatar: '/api/placeholder/40/40' },
            { name: 'Code Master', handle: '@codemaster', followers: '203K', avatar: '/api/placeholder/40/40' }
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.handle} • {user.followers} followers</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                Follow
              </motion.button>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-gray-500 hover:text-gray-600 font-medium text-sm transition-colors">
          Show more
        </button>
      </motion.div>
    </div>
  )
}

export default TrendingTopics
