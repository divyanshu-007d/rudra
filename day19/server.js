import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import multer from 'multer'
import { createServer } from 'http'
import { Server } from 'socket.io'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.static(join(__dirname, 'dist')))
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// In-memory data storage (use database in production)
let posts = [
  {
    id: 1,
    content: 'Welcome to SocialHub! This is the first post on our platform. Share your thoughts and connect with others!',
    author: 'SocialHub Team',
    authorId: 'system',
    authorAvatar: '/api/placeholder/40/40',
    image: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 42,
    comments: [
      {
        id: 1,
        author: 'Early User',
        authorAvatar: '/api/placeholder/32/32',
        content: 'Excited to be here! Looking forward to connecting with everyone.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12)
      }
    ],
    isLiked: false,
    location: 'Global'
  },
  {
    id: 2,
    content: 'Beautiful sunset from the office today! Sometimes it\'s important to take a break and appreciate the little things in life. 🌅',
    author: 'Nature Lover',
    authorId: 'user1',
    authorAvatar: '/api/placeholder/40/40',
    image: '/api/placeholder/500/300',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 28,
    comments: [
      {
        id: 1,
        author: 'Photo Enthusiast',
        authorAvatar: '/api/placeholder/32/32',
        content: 'Absolutely stunning! What camera did you use?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
      },
      {
        id: 2,
        author: 'Mindful Soul',
        authorAvatar: '/api/placeholder/32/32',
        content: 'This is so peaceful. Thanks for sharing this moment!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
      }
    ],
    isLiked: true,
    location: 'San Francisco, CA'
  }
]

let users = [
  {
    id: 'system',
    name: 'SocialHub Team',
    email: 'team@socialhub.com',
    avatar: '/api/placeholder/40/40',
    followers: 1000,
    following: 0
  }
]

let notifications = []

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })

  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`)
    console.log(`User ${userId} joined their room`)
  })
})

// Helper function to generate unique IDs
const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9)

// API Routes

// Get all posts
app.get('/api/posts', (req, res) => {
  try {
    // Sort posts by timestamp (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    res.json(sortedPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// Create a new post
app.post('/api/posts', upload.single('image'), (req, res) => {
  try {
    const { content, author, authorId, authorAvatar, location } = req.body
    
    if (!content && !req.file) {
      return res.status(400).json({ error: 'Post must have content or an image' })
    }

    const newPost = {
      id: generateId(),
      content: content || '',
      author: author || 'Anonymous',
      authorId: authorId || 'anonymous',
      authorAvatar: authorAvatar || '/api/placeholder/40/40',
      image: req.file ? `/uploads/${req.file.filename}` : null,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      isLiked: false,
      location: location || null
    }

    posts.unshift(newPost) // Add to beginning of array

    // Emit new post to all connected clients
    io.emit('new_post', newPost)

    res.status(201).json(newPost)
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Failed to create post' })
  }
})

// Like/unlike a post
app.post('/api/posts/:id/like', (req, res) => {
  try {
    const postId = req.params.id
    const post = posts.find(p => p.id.toString() === postId)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Toggle like status
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1

    // Emit like update to all connected clients
    io.emit('post_liked', { postId, likes: post.likes, isLiked: post.isLiked })

    res.json({ likes: post.likes, isLiked: post.isLiked })
  } catch (error) {
    console.error('Error liking post:', error)
    res.status(500).json({ error: 'Failed to like post' })
  }
})

// Add comment to a post
app.post('/api/posts/:id/comment', (req, res) => {
  try {
    const postId = req.params.id
    const { comment, author, authorAvatar } = req.body

    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment cannot be empty' })
    }

    const post = posts.find(p => p.id.toString() === postId)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const newComment = {
      id: generateId(),
      author: author || 'Anonymous',
      authorAvatar: authorAvatar || '/api/placeholder/32/32',
      content: comment.trim(),
      timestamp: new Date()
    }

    post.comments.push(newComment)

    // Emit comment update to all connected clients
    io.emit('new_comment', { postId, comment: newComment })

    res.status(201).json(newComment)
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ error: 'Failed to add comment' })
  }
})

// Get user profile
app.get('/api/users/:id', (req, res) => {
  try {
    const userId = req.params.id
    const user = users.find(u => u.id === userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Get user's posts
    const userPosts = posts.filter(p => p.authorId === userId)

    res.json({
      ...user,
      posts: userPosts
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Follow/unfollow user
app.post('/api/users/:id/follow', (req, res) => {
  try {
    const targetUserId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const targetUser = users.find(u => u.id === targetUserId)
    const currentUser = users.find(u => u.id === userId)

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // For simplicity, just toggle follow status
    const isFollowing = true // In real app, check if already following
    
    // Update follower counts
    targetUser.followers += isFollowing ? 1 : -1
    currentUser.following += isFollowing ? 1 : -1

    // Emit follow notification
    if (isFollowing) {
      io.to(`user_${targetUserId}`).emit('new_notification', {
        type: 'follow',
        message: `${currentUser.name} started following you`,
        user: currentUser.name,
        timestamp: new Date()
      })
    }

    res.json({ isFollowing })
  } catch (error) {
    console.error('Error following user:', error)
    res.status(500).json({ error: 'Failed to follow user' })
  }
})

// Search posts and users
app.get('/api/search', (req, res) => {
  try {
    const { q, type = 'all' } = req.query

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' })
    }

    const query = q.toLowerCase()
    let results = { posts: [], users: [] }

    if (type === 'all' || type === 'posts') {
      results.posts = posts.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      )
    }

    if (type === 'all' || type === 'users') {
      results.users = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    }

    res.json(results)
  } catch (error) {
    console.error('Error searching:', error)
    res.status(500).json({ error: 'Search failed' })
  }
})

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' })
    }
  }
  
  console.error('Unhandled error:', error)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// Create uploads directory if it doesn't exist
import { mkdirSync } from 'fs'
try {
  mkdirSync('uploads', { recursive: true })
} catch (error) {
  console.log('Uploads directory already exists')
}

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Social Media Dashboard server running on port ${PORT}`)
  console.log(`📱 Frontend: http://localhost:5173`)
  console.log(`🔧 API: http://localhost:${PORT}/api`)
})
