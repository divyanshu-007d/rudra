import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer with 5+ years of experience creating digital solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/api/placeholder/500/600"
              alt="About me"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating beautiful, functional, and user-friendly applications that solve 
              real-world problems.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With a strong foundation in both front-end and back-end development, I enjoy 
              working with React, Node.js, Python, and various databases. I'm always eager 
              to learn new technologies and take on challenging projects.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { label: 'Projects Completed', value: '50+' },
                { label: 'Years Experience', value: '5+' },
                { label: 'Happy Clients', value: '30+' },
                { label: 'Technologies', value: '20+' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
