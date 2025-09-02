import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Firebase', 'Material-UI'],
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Weather application with interactive maps and forecasts',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'OpenWeather API', 'Leaflet'],
      github: '#',
      live: '#'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Some of my recent work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden card-hover"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.github}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.live}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
