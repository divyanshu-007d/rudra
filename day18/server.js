import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// In-memory storage for demo purposes
let boardData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design system architecture', priority: 'high', labels: ['feature'], assignee: 'John Doe', dueDate: '2024-12-10' },
    'task-2': { id: 'task-2', content: 'Implement user authentication', priority: 'high', labels: ['feature'], assignee: 'Jane Smith', dueDate: '2024-12-15' },
    'task-3': { id: 'task-3', content: 'Create landing page', priority: 'medium', labels: ['task'], assignee: 'Mike Johnson', dueDate: '2024-12-20' },
    'task-4': { id: 'task-4', content: 'Fix responsive design issues', priority: 'medium', labels: ['bug'], assignee: 'Sarah Wilson', dueDate: '2024-12-12' },
    'task-5': { id: 'task-5', content: 'Add dark mode toggle', priority: 'low', labels: ['improvement'], assignee: 'Alex Brown', dueDate: '2024-12-25' },
    'task-6': { id: 'task-6', content: 'Optimize database queries', priority: 'high', labels: ['improvement'], assignee: 'Chris Davis', dueDate: '2024-12-18' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      taskIds: ['task-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: ['task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Send current board data to newly connected client
  socket.emit('boardData', boardData)

  // Handle task updates
  socket.on('updateTasks', (newData) => {
    boardData = newData
    // Broadcast to all other clients
    socket.broadcast.emit('taskUpdated', boardData)
  })

  // Handle task creation
  socket.on('createTask', (taskData) => {
    console.log('New task created:', taskData)
    socket.broadcast.emit('taskCreated', taskData)
  })

  // Handle task deletion
  socket.on('deleteTask', (taskId) => {
    console.log('Task deleted:', taskId)
    socket.broadcast.emit('taskDeleted', taskId)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// REST API routes
app.get('/api/board', (req, res) => {
  res.json(boardData)
})

app.post('/api/board', (req, res) => {
  boardData = req.body
  io.emit('taskUpdated', boardData)
  res.json({ success: true })
})

app.get('/api/tasks', (req, res) => {
  res.json(boardData.tasks)
})

app.post('/api/tasks', (req, res) => {
  const newTask = req.body
  boardData.tasks[newTask.id] = newTask
  
  // Add to first column by default
  boardData.columns['column-1'].taskIds.push(newTask.id)
  
  io.emit('taskCreated', newTask)
  res.json({ success: true, task: newTask })
})

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id
  if (boardData.tasks[taskId]) {
    boardData.tasks[taskId] = { ...boardData.tasks[taskId], ...req.body }
    io.emit('taskUpdated', boardData)
    res.json({ success: true, task: boardData.tasks[taskId] })
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
})

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id
  if (boardData.tasks[taskId]) {
    delete boardData.tasks[taskId]
    
    // Remove from all columns
    Object.keys(boardData.columns).forEach(columnId => {
      boardData.columns[columnId].taskIds = boardData.columns[columnId].taskIds.filter(
        id => id !== taskId
      )
    })
    
    io.emit('taskDeleted', taskId)
    res.json({ success: true })
  } else {
    res.status(404).json({ error: 'Task not found' })
  }
})

// Statistics endpoint
app.get('/api/stats', (req, res) => {
  const stats = {
    totalTasks: Object.keys(boardData.tasks).length,
    completedTasks: boardData.columns['column-4'].taskIds.length,
    inProgressTasks: boardData.columns['column-2'].taskIds.length,
    todoTasks: boardData.columns['column-1'].taskIds.length,
    reviewTasks: boardData.columns['column-3'].taskIds.length,
    progress: Math.round((boardData.columns['column-4'].taskIds.length / Object.keys(boardData.tasks).length) * 100) || 0
  }
  res.json(stats)
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`🚀 TaskBoard server running on port ${PORT}`)
  console.log(`📋 Board: http://localhost:${PORT}`)
  console.log(`🔌 Socket.io ready for real-time collaboration`)
})
