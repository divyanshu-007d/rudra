import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CreatePostModal from '../components/CreatePostModal'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'
import TrendingTopics from '../components/TrendingTopics'
import { usePost } from '../context/PostContext'
import { useUser } from '../context/UserContext'
import { Plus, TrendingUp } from 'lucide-react'

const HomePage = () => {
  const { user } = useUser()
  const { posts, loading } = usePost()
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6">
          {/* Create Post Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3 text-gray-600 transition-colors"
              >
                What's on your mind, {user.name.split(' ')[0]}?
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {loading ? (
              // Loading Skeleton
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="h-8 bg-gray-300 rounded w-16"></div>
                      <div className="h-8 bg-gray-300 rounded w-16"></div>
                      <div className="h-8 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
              >
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to SocialHub!
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by creating your first post or following some users to see their content in your feed.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors"
                >
                  Create Your First Post
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3">
          <TrendingTopics />
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

export default HomePage
