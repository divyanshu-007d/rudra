import React from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="relative mx-auto w-48 h-48 mb-8"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <img
                src="/api/placeholder/200/200"
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-gray-200"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse opacity-20"></div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white"
          >
            John <span className="gradient-text">Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 typing-animation max-w-2xl mx-auto"
          >
            Full-Stack Developer & UI/UX Designer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            I create beautiful, responsive web applications with modern technologies. 
            Passionate about clean code, user experience, and bringing ideas to life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glow bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-500 text-blue-500 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 transition-all"
            >
              View My Work
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center space-x-6 mt-8"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#contact', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -5 }}
                className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow text-gray-700 dark:text-gray-300 hover:text-blue-500"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
