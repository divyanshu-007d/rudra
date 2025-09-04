// Day 13: Database Basics - Notes App with Express + SQLite
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const dbPath = join(__dirname, 'notes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database helper functions
const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '📝 Day 13: Notes App with Database',
    description: 'Full-Stack Notes application with SQLite database',
    features: [
      'SQLite database integration',
      'Full CRUD operations',
      'Categories and tags',
      'User management',
      'Advanced filtering'
    ],
    endpoints: {
      users: {
        'GET /api/users': 'Get all users',
        'POST /api/users': 'Create user',
        'GET /api/users/:id': 'Get user by ID'
      },
      categories: {
        'GET /api/categories': 'Get all categories',
        'POST /api/categories': 'Create category',
        'PUT /api/categories/:id': 'Update category',
        'DELETE /api/categories/:id': 'Delete category'
      },
      notes: {
        'GET /api/notes': 'Get all notes (with filtering)',
        'GET /api/notes/:id': 'Get note by ID',
        'POST /api/notes': 'Create note',
        'PUT /api/notes/:id': 'Update note',
        'DELETE /api/notes/:id': 'Delete note',
        'PATCH /api/notes/:id/favorite': 'Toggle favorite',
        'PATCH /api/notes/:id/archive': 'Toggle archive'
      },
      stats: {
        'GET /api/stats': 'Get database statistics'
      }
    },
    database: 'SQLite (notes.db)'
  });
});

// USER ROUTES

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await dbAll(`
      SELECT id, uuid, name, email, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await dbGet(`
      SELECT id, uuid, name, email, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `, [req.params.id]);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Check if email exists
    const existingUser = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userUuid = uuidv4();
    
    const result = await dbRun(`
      INSERT INTO users (uuid, name, email, password_hash) 
      VALUES (?, ?, ?, ?)
    `, [userUuid, name, email, hashedPassword]);
    
    const newUser = await dbGet(`
      SELECT id, uuid, name, email, created_at 
      FROM users 
      WHERE id = ?
    `, [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

// CATEGORY ROUTES

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const userId = req.query.user_id || 1; // Default to user 1 for demo
    
    const categories = await dbAll(`
      SELECT c.*, COUNT(n.id) as note_count
      FROM categories c
      LEFT JOIN notes n ON c.id = n.category_id AND n.is_archived = 0
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.name
    `, [userId]);
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// Create category
app.post('/api/categories', async (req, res) => {
  try {
    const { name, color = '#6c757d', user_id = 1 } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }
    
    const result = await dbRun(`
      INSERT INTO categories (name, color, user_id) 
      VALUES (?, ?, ?)
    `, [name, color, user_id]);
    
    const newCategory = await dbGet(`
      SELECT * FROM categories WHERE id = ?
    `, [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creating category',
        error: error.message
      });
    }
  }
});

// Update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { name, color } = req.body;
    
    const result = await dbRun(`
      UPDATE categories 
      SET name = COALESCE(?, name), color = COALESCE(?, color)
      WHERE id = ?
    `, [name, color, req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    const updatedCategory = await dbGet(`
      SELECT * FROM categories WHERE id = ?
    `, [req.params.id]);
    
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
});

// Delete category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    // Check if category has notes
    const notesCount = await dbGet(`
      SELECT COUNT(*) as count FROM notes WHERE category_id = ?
    `, [req.params.id]);
    
    if (notesCount.count > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It contains ${notesCount.count} notes. Please move or delete the notes first.`
      });
    }
    
    const result = await dbRun(`
      DELETE FROM categories WHERE id = ?
    `, [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
});

// NOTES ROUTES

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const {
      user_id = 1,
      category_id,
      is_favorite,
      is_archived = '0',
      search,
      limit = 50,
      offset = 0
    } = req.query;
    
    let query = `
      SELECT 
        n.*,
        c.name as category_name,
        c.color as category_color,
        u.name as user_name
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      LEFT JOIN users u ON n.user_id = u.id
      WHERE n.user_id = ? AND n.is_archived = ?
    `;
    
    const params = [user_id, is_archived];
    
    if (category_id) {
      query += ' AND n.category_id = ?';
      params.push(category_id);
    }
    
    if (is_favorite !== undefined) {
      query += ' AND n.is_favorite = ?';
      params.push(is_favorite);
    }
    
    if (search) {
      query += ' AND (n.title LIKE ? OR n.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY n.updated_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const notes = await dbAll(query, params);
    
    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: error.message
    });
  }
});

// Get note by ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await dbGet(`
      SELECT 
        n.*,
        c.name as category_name,
        c.color as category_color,
        u.name as user_name
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      LEFT JOIN users u ON n.user_id = u.id
      WHERE n.id = ?
    `, [req.params.id]);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching note',
      error: error.message
    });
  }
});

// Create note
app.post('/api/notes', async (req, res) => {
  try {
    const {
      title,
      content = '',
      category_id,
      user_id = 1,
      tags = '[]',
      is_favorite = false
    } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Note title is required'
      });
    }
    
    const noteUuid = uuidv4();
    
    const result = await dbRun(`
      INSERT INTO notes (uuid, title, content, category_id, user_id, tags, is_favorite) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [noteUuid, title, content, category_id, user_id, tags, is_favorite ? 1 : 0]);
    
    const newNote = await dbGet(`
      SELECT 
        n.*,
        c.name as category_name,
        c.color as category_color
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.id = ?
    `, [result.id]);
    
    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating note',
      error: error.message
    });
  }
});

// Update note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const {
      title,
      content,
      category_id,
      tags,
      is_favorite,
      is_archived
    } = req.body;
    
    const result = await dbRun(`
      UPDATE notes 
      SET 
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        category_id = COALESCE(?, category_id),
        tags = COALESCE(?, tags),
        is_favorite = COALESCE(?, is_favorite),
        is_archived = COALESCE(?, is_archived),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, content, category_id, tags, is_favorite, is_archived, req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const updatedNote = await dbGet(`
      SELECT 
        n.*,
        c.name as category_name,
        c.color as category_color
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.id = ?
    `, [req.params.id]);
    
    res.json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating note',
      error: error.message
    });
  }
});

// Toggle favorite
app.patch('/api/notes/:id/favorite', async (req, res) => {
  try {
    const note = await dbGet('SELECT is_favorite FROM notes WHERE id = ?', [req.params.id]);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const newFavoriteStatus = note.is_favorite ? 0 : 1;
    
    await dbRun(`
      UPDATE notes 
      SET is_favorite = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newFavoriteStatus, req.params.id]);
    
    res.json({
      success: true,
      message: `Note ${newFavoriteStatus ? 'added to' : 'removed from'} favorites`,
      data: { is_favorite: newFavoriteStatus }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling favorite',
      error: error.message
    });
  }
});

// Toggle archive
app.patch('/api/notes/:id/archive', async (req, res) => {
  try {
    const note = await dbGet('SELECT is_archived FROM notes WHERE id = ?', [req.params.id]);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const newArchivedStatus = note.is_archived ? 0 : 1;
    
    await dbRun(`
      UPDATE notes 
      SET is_archived = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newArchivedStatus, req.params.id]);
    
    res.json({
      success: true,
      message: `Note ${newArchivedStatus ? 'archived' : 'unarchived'}`,
      data: { is_archived: newArchivedStatus }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling archive',
      error: error.message
    });
  }
});

// Delete note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const result = await dbRun('DELETE FROM notes WHERE id = ?', [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: error.message
    });
  }
});

// STATISTICS ROUTE

app.get('/api/stats', async (req, res) => {
  try {
    const user_id = req.query.user_id || 1;
    
    const stats = await dbAll(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM notes WHERE user_id = ?) as total_notes,
        (SELECT COUNT(*) FROM notes WHERE user_id = ? AND is_favorite = 1) as favorite_notes,
        (SELECT COUNT(*) FROM notes WHERE user_id = ? AND is_archived = 1) as archived_notes,
        (SELECT COUNT(*) FROM categories WHERE user_id = ?) as total_categories,
        (SELECT name FROM categories WHERE user_id = ? ORDER BY (SELECT COUNT(*) FROM notes WHERE category_id = categories.id) DESC LIMIT 1) as most_used_category
    `, [user_id, user_id, user_id, user_id, user_id]);
    
    const categoryStats = await dbAll(`
      SELECT c.name, c.color, COUNT(n.id) as note_count
      FROM categories c
      LEFT JOIN notes n ON c.id = n.category_id AND n.is_archived = 0 AND n.user_id = ?
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY note_count DESC
    `, [user_id, user_id]);
    
    res.json({
      success: true,
      data: {
        ...stats[0],
        category_distribution: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
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
  console.log(`🚀 Day 13: Notes App running on http://localhost:${PORT}`);
  console.log(`💾 Database: ${dbPath}`);
  console.log(`📚 Features: Full CRUD, Categories, Search, Favorites`);
  console.log(`🔧 Setup commands:`);
  console.log(`   npm run setup    - Create database tables`);
  console.log(`   npm run seed     - Add sample data`);
  console.log(`   npm run reset    - Setup + seed`);
});

export default app;