import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, TrendingUp, Users, Hash, MapPin } from 'lucide-react'
import PostCard from '../components/PostCard'

const ExplorePage = () => {
  const [activeFilter, setActiveFilter] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'people', label: 'People', icon: Users },
    { id: 'topics', label: 'Topics', icon: Hash },
    { id: 'places', label: 'Places', icon: MapPin }
  ]

  // Mock data for explore content
  const trendingPosts = [
    {
      id: 1,
      author: 'Tech Innovator',
      authorAvatar: '/api/placeholder/40/40',
      content: 'The future of AI in web development is here! Just tried the new GPT-4 integration and it\'s mind-blowing 🤯',
      image: '/api/placeholder/500/300',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 156,
      comments: [
        { author: 'Dev Enthusiast', content: 'This is amazing! Can\'t wait to try it out.', timestamp: new Date() }
      ],
      isLiked: false,
      location: 'Silicon Valley, CA'
    },
    {
      id: 2,
      author: 'Design Guru',
      authorAvatar: '/api/placeholder/40/40',
      content: 'New design trends for 2024: Glassmorphism is making a comeback! What do you think about this design approach?',
      image: '/api/placeholder/500/400',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 89,
      comments: [],
      isLiked: true
    },
    {
      id: 3,
      author: 'Code Master',
      authorAvatar: '/api/placeholder/40/40',
      content: 'Just published my latest article on React 19 features. The new concurrent features are game-changing!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likes: 234,
      comments: [
        { author: 'React Fan', content: 'Great article! Very informative.', timestamp: new Date() },
        { author: 'Frontend Dev', content: 'Thanks for sharing this!', timestamp: new Date() }
      ],
      isLiked: false
    }
  ]

  const suggestedPeople = [
    {
      name: 'Sarah Johnson',
      handle: '@sarahj_design',
      bio: 'UX Designer at Google • Design systems enthusiast',
      avatar: '/api/placeholder/60/60',
      followers: '45.2K',
      isFollowing: false
    },
    {
      name: 'Mike Chen',
      handle: '@mikechen_dev',
      bio: 'Full-stack developer • React & Node.js expert',
      avatar: '/api/placeholder/60/60',
      followers: '32.8K',
      isFollowing: false
    },
    {
      name: 'Emily Rodriguez',
      handle: '@emily_codes',
      bio: 'Frontend engineer • Vue.js core team member',
      avatar: '/api/placeholder/60/60',
      followers: '67.1K',
      isFollowing: true
    }
  ]

  const trendingTopics = [
    { tag: '#WebDevelopment', posts: '125K', growth: '+15%' },
    { tag: '#ReactJS', posts: '89K', growth: '+8%' },
    { tag: '#AI', posts: '234K', growth: '+25%' },
    { tag: '#DesignSystems', posts: '45K', growth: '+12%' },
    { tag: '#JavaScript', posts: '156K', growth: '+6%' }
  ]

  const places = [
    { name: 'San Francisco, CA', posts: '45.2K', image: '/api/placeholder/80/80' },
    { name: 'New York, NY', posts: '67.8K', image: '/api/placeholder/80/80' },
    { name: 'London, UK', posts: '32.1K', image: '/api/placeholder/80/80' },
    { name: 'Tokyo, Japan', posts: '28.9K', image: '/api/placeholder/80/80' }
  ]

  const renderContent = () => {
    switch (activeFilter) {
      case 'trending':
        return (
          <div className="space-y-6">
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )

      case 'people':
        return (
          <div className="space-y-4">
            {suggestedPeople.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                      <p className="text-gray-600">{person.handle}</p>
                      <p className="text-sm text-gray-500 mt-1">{person.bio}</p>
                      <p className="text-sm text-gray-500 mt-1">{person.followers} followers</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      person.isFollowing
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {person.isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'topics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{topic.tag}</h3>
                    <p className="text-gray-600 mt-1">{topic.posts} posts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-500 font-semibold">{topic.growth}</span>
                    <p className="text-sm text-gray-500">growth</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'places':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {places.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-32">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold">{place.name}</h3>
                      <p className="text-sm opacity-90">{place.posts} posts</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
        <p className="text-gray-600">Discover trending posts, people, and topics</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for posts, people, or topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6"
      >
        <div className="flex items-center space-x-1 p-2">
          {filters.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}

export default ExplorePage
