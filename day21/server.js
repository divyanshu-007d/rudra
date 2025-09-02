import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')))

// API Routes
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  
  // In a real application, you would:
  // 1. Validate the data
  // 2. Send the email using a service like nodemailer
  // 3. Store the message in a database
  
  console.log('Contact form submission:', { name, email, message })
  
  // Simulate email sending
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.'
    })
  }, 1000)
})

// API route for blog posts
app.get('/api/blog', (req, res) => {
  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for creating maintainable and scalable React applications.',
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      tags: ['React', 'JavaScript', 'Architecture']
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      excerpt: 'Exploring upcoming trends and technologies that will shape the future of web development.',
      author: 'John Doe',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Web Development',
      tags: ['Web Development', 'Technology', 'Future']
    }
  ]
  
  res.json(blogPosts)
})

// API route for projects
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern, responsive e-commerce platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/johndoe/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
      technologies: ['React', 'Firebase', 'Material-UI'],
      githubUrl: 'https://github.com/johndoe/task-manager',
      liveUrl: 'https://taskmanager-demo.com',
      category: 'Frontend'
    }
  ]
  
  res.json(projects)
})

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`)
  console.log(`Visit: http://localhost:${PORT}`)
})
