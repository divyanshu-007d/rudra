import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Camera, MapPin, Calendar, Edit, Settings, Users, Grid, BookOpen } from 'lucide-react'
import { useUser } from '../context/UserContext'
import PostCard from '../components/PostCard'

const ProfilePage = () => {
  const { userId } = useParams()
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('posts')
  const [isOwnProfile] = useState(!userId || userId === user.id.toString())

  // Mock profile data - in real app, fetch based on userId
  const profileData = {
    id: userId || user.id,
    name: isOwnProfile ? user.name : 'John Smith',
    email: isOwnProfile ? user.email : 'john@example.com',
    avatar: isOwnProfile ? user.avatar : '/api/placeholder/120/120',
    coverImage: '/api/placeholder/800/300',
    bio: isOwnProfile ? user.bio : 'Passionate developer and tech enthusiast. Love to build amazing web experiences!',
    location: 'San Francisco, CA',
    joinDate: 'Joined March 2023',
    website: 'https://johnsmith.dev',
    followers: isOwnProfile ? user.followers : 890,
    following: isOwnProfile ? user.following : 456,
    posts: isOwnProfile ? user.posts : 78,
    isFollowing: !isOwnProfile
  }

  // Mock posts data
  const userPosts = [
    {
      id: 1,
      author: profileData.name,
      authorAvatar: profileData.avatar,
      content: 'Just launched my new portfolio website! Built with React and Tailwind CSS. What do you think?',
      image: '/api/placeholder/500/300',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 24,
      comments: [
        { author: 'Sarah Wilson', content: 'Looks amazing! Great work!', timestamp: new Date() }
      ],
      isLiked: false
    },
    {
      id: 2,
      author: profileData.name,
      authorAvatar: profileData.avatar,
      content: 'Beautiful sunset from my office window today. Sometimes it\'s good to take a break and appreciate the little things.',
      image: '/api/placeholder/500/400',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      likes: 42,
      comments: [],
      isLiked: true
    }
  ]

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'followers', label: 'Followers', icon: Users }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-purple-500 to-blue-500 h-64 rounded-2xl overflow-hidden mb-6"
      >
        <img
          src={profileData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && (
          <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        )}
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 -mt-20 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
          {/* Avatar */}
          <div className="relative mb-4 md:mb-0">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-32 h-32 rounded-full border-6 border-white object-cover shadow-lg"
            />
            {isOwnProfile && (
              <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600 mt-1">{profileData.bio}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{profileData.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {isOwnProfile ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        profileData.isFollowing
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {profileData.isFollowing ? 'Following' : 'Follow'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Message
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{profileData.posts}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{profileData.followers}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{profileData.following}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6"
      >
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
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
                <div className="text-center py-12">
                  <Grid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile ? 'Share your first post with the community!' : 'This user hasn\'t posted anything yet.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Email: {profileData.email}</p>
                    <p className="text-gray-600">Website: {profileData.website}</p>
                    <p className="text-gray-600">Location: {profileData.location}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Basic Info</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">{profileData.joinDate}</p>
                    <p className="text-gray-600">Active user</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'followers' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Followers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img
                      src={`/api/placeholder/40/40`}
                      alt="Follower"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">User {index + 1}</p>
                      <p className="text-sm text-gray-500">@user{index + 1}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage
