import React from 'react'
import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'Tech Corp',
      content: 'Amazing developer! Delivered the project on time and exceeded expectations.',
      avatar: '/api/placeholder/64/64'
    },
    {
      name: 'Mike Wilson',
      role: 'CEO',
      company: 'StartUp Inc',
      content: 'Great communication and excellent technical skills. Highly recommended!',
      avatar: '/api/placeholder/64/64'
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Testimonials</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">What clients say about me</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
