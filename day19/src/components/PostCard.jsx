import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, MapPin } from 'lucide-react'
import { usePost } from '../context/PostContext'
import { useNotification } from '../context/NotificationContext'

const PostCard = ({ post }) => {
  const { likePost, addComment } = usePost()
  const { addNotification } = useNotification()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likes, setLikes] = useState(post.likes || 0)

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked)
      setLikes(isLiked ? likes - 1 : likes + 1)
      await likePost(post.id)
      
      if (!isLiked) {
        addNotification({
          type: 'like',
          message: `${post.author} liked your post`,
          user: post.author
        })
      }
    } catch (error) {
      // Revert on error
      setIsLiked(isLiked)
      setLikes(likes)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await addComment(post.id, newComment)
      setNewComment('')
      addNotification({
        type: 'comment',
        message: `${post.author} commented on your post`,
        user: post.author
      })
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const timeAgo = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInMs = now - postTime
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays}d ago`
    } else if (diffInHours > 0) {
      return `${diffInHours}h ago`
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return `${diffInMinutes}m ago`
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.authorAvatar || '/api/placeholder/40/40'}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{post.author}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{timeAgo(post.timestamp)}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="mt-3">
            <p className="text-gray-900 leading-relaxed">{post.content}</p>
          </div>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments?.length || 0}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
            >
              <Share className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-500 hover:text-yellow-500 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-3"
          >
            {/* Existing Comments */}
            {post.comments && post.comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex space-x-2">
                    <img
                      src={comment.authorAvatar || '/api/placeholder/24/24'}
                      alt={comment.author}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <p className="font-semibold text-sm text-gray-900">{comment.author}</p>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{timeAgo(comment.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <form onSubmit={handleComment} className="flex space-x-2">
              <img
                src="/api/placeholder/32/32"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Post
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default PostCard
