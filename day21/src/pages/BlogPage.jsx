import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for creating maintainable and scalable React applications that can grow with your team.',
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      tags: ['React', 'JavaScript', 'Architecture']
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      excerpt: 'Exploring upcoming trends and technologies that will shape the future of web development in the next decade.',
      author: 'John Doe',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
      tags: ['Web Development', 'Technology', 'Future']
    },
    {
      id: 3,
      title: 'Mastering CSS Grid and Flexbox',
      excerpt: 'A comprehensive guide to modern CSS layout techniques that every developer should know.',
      author: 'John Doe',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'CSS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      tags: ['CSS', 'Layout', 'Design']
    },
    {
      id: 4,
      title: 'Node.js Best Practices',
      excerpt: 'Essential patterns and practices for building robust and efficient Node.js applications.',
      author: 'John Doe',
      date: '2024-01-01',
      readTime: '15 min read',
      category: 'Node.js',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
      tags: ['Node.js', 'Backend', 'JavaScript']
    }
  ]

  const categories = ['All', 'React', 'Web Development', 'CSS', 'Node.js']

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and insights on web development
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-500 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:shadow-lg transition-shadow"
                >
                  Read More
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
