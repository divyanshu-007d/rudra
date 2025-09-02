import React from 'react'
import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of web applications using React and Node.js'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Built responsive websites and web applications for clients'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Co.',
      period: '2019 - 2020',
      description: 'Assisted in development of company products and learned industry best practices'
    }
  ]

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">My professional journey</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{exp.period}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
