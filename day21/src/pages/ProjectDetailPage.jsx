import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, User, Tag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const ProjectDetailPage = () => {
  const { id } = useParams()

  // Mock project data - in a real app, this would come from an API or context
  const project = {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern, responsive e-commerce platform built with React and Node.js',
    longDescription: `This comprehensive e-commerce platform provides a complete online shopping experience with modern design and robust functionality. Built using cutting-edge technologies, it offers seamless user experience from browsing products to secure checkout.

The platform features a responsive design that works perfectly on all devices, advanced product filtering and search capabilities, secure user authentication, shopping cart management, and integrated payment processing.

Key challenges solved include optimizing performance for large product catalogs, implementing secure payment processing, creating an intuitive admin panel for inventory management, and ensuring cross-browser compatibility.`,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT', 'Tailwind CSS'],
    features: [
      'User Authentication & Authorization',
      'Product Catalog with Advanced Filtering',
      'Shopping Cart & Wishlist',
      'Secure Payment Integration',
      'Order Management System',
      'Admin Dashboard',
      'Real-time Inventory Updates',
      'Email Notifications',
      'Mobile Responsive Design',
      'SEO Optimization'
    ],
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    category: 'Full Stack',
    date: '2024-01-15',
    duration: '3 months',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop'
    ]
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
              {project.category}
            </span>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(project.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4 mr-1" />
              Duration: {project.duration}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              View Code
            </motion.a>
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Live Demo
            </motion.a>
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg"
              >
                <Tag className="w-4 h-4 mr-2" />
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            About This Project
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {project.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Project Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Interested in Working Together?</h3>
          <p className="mb-6">
            Let's discuss how we can bring your ideas to life with cutting-edge technology.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
