import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Image, MapPin, Smile, Send } from 'lucide-react'
import { usePost } from '../context/PostContext'
import { useUser } from '../context/UserContext'

const CreatePostModal = ({ onClose }) => {
  const { user } = useUser()
  const { createPost } = usePost()
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() && !image) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('content', content)
      formData.append('author', user.name)
      formData.append('authorId', user.id)
      formData.append('authorAvatar', user.avatar)
      if (image) {
        formData.append('image', image)
      }
      if (location) {
        formData.append('location', location)
      }

      await createPost(formData)
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{user.name}</h4>
              <p className="text-sm text-gray-500">Sharing publicly</p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 min-h-[120px]"
              maxLength={280}
            />
            <div className="text-right text-sm text-gray-500">
              {content.length}/280
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null)
                  setImagePreview(null)
                }}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Location */}
          {location && (
            <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
              <button
                type="button"
                onClick={() => setLocation('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Image className="w-5 h-5 text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => setLocation(location || 'New York, NY')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-500" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Smile className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={(!content.trim() && !image) || loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{loading ? 'Posting...' : 'Post'}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreatePostModal
