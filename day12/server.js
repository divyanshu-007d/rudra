// Day 12: Node.js Backend for To-Do App
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory storage for todos (acts as database)
let todos = [
  {
    id: 1,
    title: "Learn React basics",
    description: "Complete React fundamentals tutorial",
    completed: true,
    priority: "high",
    category: "Learning",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-01T15:30:00Z"
  },
  {
    id: 2,
    title: "Build REST API",
    description: "Create Express.js API with CRUD operations",
    completed: true,
    priority: "high",
    category: "Development",
    createdAt: "2025-09-02T09:00:00Z",
    updatedAt: "2025-09-02T16:45:00Z"
  },
  {
    id: 3,
    title: "Connect frontend to backend",
    description: "Integrate React app with Node.js API using fetch",
    completed: false,
    priority: "high",
    category: "Development",
    createdAt: "2025-09-03T08:00:00Z",
    updatedAt: "2025-09-03T08:00:00Z"
  },
  {
    id: 4,
    title: "Add authentication",
    description: "Implement user login and registration",
    completed: false,
    priority: "medium",
    category: "Security",
    createdAt: "2025-09-03T10:00:00Z",
    updatedAt: "2025-09-03T10:00:00Z"
  }
];

// Helper functions
const findTodoById = (id) => todos.find(todo => todo.id === parseInt(id));
const getNextId = () => Math.max(...todos.map(t => t.id), 0) + 1;
const getCurrentTimestamp = () => new Date().toISOString();

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '✅ Day 12: To-Do API Backend',
    description: 'Full-Stack To-Do app with React frontend',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/:id': 'Get todo by ID',
      'POST /api/todos': 'Create new todo',
      'PUT /api/todos/:id': 'Update todo',
      'DELETE /api/todos/:id': 'Delete todo',
      'PATCH /api/todos/:id/toggle': 'Toggle todo completion',
      'GET /api/stats': 'Get todo statistics'
    },
    frontend: 'http://localhost:5173',
    totalTodos: todos.length
  });
});

// GET all todos
app.get('/api/todos', (req, res) => {
  try {
    let filteredTodos = todos;
    
    // Filter by completion status
    if (req.query.completed !== undefined) {
      const isCompleted = req.query.completed === 'true';
      filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
    }
    
    // Filter by priority
    if (req.query.priority) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.priority.toLowerCase() === req.query.priority.toLowerCase()
      );
    }
    
    // Filter by category
    if (req.query.category) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.category.toLowerCase().includes(req.query.category.toLowerCase())
      );
    }
    
    // Sort by creation date (newest first)
    filteredTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      count: filteredTodos.length,
      data: filteredTodos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
});

// GET todo by ID
app.get('/api/todos/:id', (req, res) => {
  try {
    const todo = findTodoById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${req.params.id} not found`
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
});

// POST new todo
app.post('/api/todos', (req, res) => {
  try {
    const { title, description, priority = 'medium', category = 'General' } = req.body;
    
    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }
    
    const newTodo = {
      id: getNextId(),
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      priority: priority.toLowerCase(),
      category: category.trim(),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  try {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${req.params.id} not found`
      });
    }
    
    const { title, description, priority, category, completed } = req.body;
    
    // Update todo
    const updatedTodo = {
      ...todos[todoIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(priority !== undefined && { priority: priority.toLowerCase() }),
      ...(category !== undefined && { category: category.trim() }),
      ...(completed !== undefined && { completed }),
      updatedAt: getCurrentTimestamp()
    };
    
    todos[todoIndex] = updatedTodo;
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
});

// PATCH toggle todo completion
app.patch('/api/todos/:id/toggle', (req, res) => {
  try {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${req.params.id} not found`
      });
    }
    
    todos[todoIndex].completed = !todos[todoIndex].completed;
    todos[todoIndex].updatedAt = getCurrentTimestamp();
    
    res.json({
      success: true,
      message: `Todo ${todos[todoIndex].completed ? 'completed' : 'marked as pending'}`,
      data: todos[todoIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling todo',
      error: error.message
    });
  }
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with ID ${req.params.id} not found`
      });
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
});

// GET statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      priorityDistribution: todos.reduce((acc, todo) => {
        acc[todo.priority] = (acc[todo.priority] || 0) + 1;
        return acc;
      }, {}),
      categoryDistribution: todos.reduce((acc, todo) => {
        acc[todo.category] = (acc[todo.category] || 0) + 1;
        return acc;
      }, {}),
      completionRate: todos.length > 0 ? 
        Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating statistics',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Day 12: To-Do API running on http://localhost:${PORT}`);
  console.log(`📝 Total todos: ${todos.length}`);
  console.log(`✅ Completed: ${todos.filter(t => t.completed).length}`);
  console.log(`⏳ Pending: ${todos.filter(t => !t.completed).length}`);
  console.log(`🎯 Frontend should run on: http://localhost:5173`);
});

export default app;