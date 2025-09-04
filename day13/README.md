# Day 13: Database Basics - Notes App

Full-Stack Notes application with Express.js backend and SQLite database integration.

## 🎯 Mini Task: Notes App (full-stack CRUD)

### Features
- ✅ **SQLite Database**: Relational database with proper schema
- ✅ **User Management**: Create and manage users
- ✅ **Categories**: Organize notes with colored categories
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete notes
- ✅ **Advanced Features**: Favorites, Archive, Search, Tags
- ✅ **Data Relationships**: Foreign keys and joins
- ✅ **Statistics**: Real-time database statistics

### Topics Covered
- **Database Connection**: SQLite integration with Node.js
- **Schema Design**: Tables, relationships, indexes
- **SQL Queries**: CRUD operations with parameterized queries
- **Database Security**: Password hashing, SQL injection prevention
- **Data Relationships**: Foreign keys and table joins
- **Advanced Queries**: Filtering, searching, aggregation

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create database tables
npm run setup

# Add sample data
npm run seed

# Or do both at once
npm run reset
```

### 3. Start Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 4. Access API
- **API Base URL**: http://localhost:3000
- **Documentation**: http://localhost:3000 (shows all endpoints)

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6c757d',
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE(name, user_id)
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category_id INTEGER,
  user_id INTEGER,
  is_favorite BOOLEAN DEFAULT 0,
  is_archived BOOLEAN DEFAULT 0,
  tags TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 📡 API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get user's categories |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get notes (with filtering) |
| GET | `/api/notes/:id` | Get specific note |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |
| PATCH | `/api/notes/:id/favorite` | Toggle favorite status |
| PATCH | `/api/notes/:id/archive` | Toggle archive status |

### Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get database statistics |

## 🔍 Advanced Filtering

### Notes Filtering Options
```bash
# Filter by category
GET /api/notes?category_id=1

# Filter by favorites
GET /api/notes?is_favorite=1

# Search in title/content
GET /api/notes?search=learning

# Show archived notes
GET /api/notes?is_archived=1

# Pagination
GET /api/notes?limit=10&offset=20

# Combine filters
GET /api/notes?category_id=2&is_favorite=1&search=goals
```

## 💾 Database Operations

### Connection Management
```javascript
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('notes.db', (err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to SQLite database');
});
```

### Parameterized Queries (Security)
```javascript
// ✅ SAFE - Prevents SQL injection
const user = await dbGet(
  'SELECT * FROM users WHERE email = ?', 
  [email]
);

// ❌ DANGEROUS - SQL injection vulnerability
const user = await dbGet(
  `SELECT * FROM users WHERE email = '${email}'`
);
```

### Database Helpers
```javascript
const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
```

## 🧪 Sample Data

### Test User
- **Email**: john.doe@example.com
- **Password**: password123

### Pre-loaded Categories
- 🔴 Personal (#ff6b6b)
- 🔵 Work (#4ecdc4)
- 🟢 Study (#45b7d1)
- 🟡 Ideas (#f9ca24)
- 🟣 Goals (#6c5ce7)

### Sample Notes
- Learning goals with checkboxes
- App ideas and project plans
- Study notes with markdown
- Work project updates
- Personal interests and hobbies

## 🔧 Key Database Concepts

### 1. Relationships
```sql
-- One-to-Many: User has many notes
FOREIGN KEY (user_id) REFERENCES users (id)

-- One-to-Many: Category has many notes
FOREIGN KEY (category_id) REFERENCES categories (id)
```

### 2. Indexes for Performance
```sql
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_category_id ON notes(category_id);
CREATE INDEX idx_notes_created_at ON notes(created_at);
```

### 3. Data Validation
```javascript
// Check required fields
if (!title) {
  return res.status(400).json({
    success: false,
    message: 'Note title is required'
  });
}

// Check uniqueness
const existingUser = await dbGet(
  'SELECT id FROM users WHERE email = ?', 
  [email]
);
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Parameterized Queries**: Prevents SQL injection attacks
- **Input Validation**: Server-side validation for all inputs
- **UUID Generation**: Unique identifiers for public APIs

## 📈 Statistics & Analytics

The `/api/stats` endpoint provides:
- Total users, notes, categories
- Favorite and archived note counts
- Category usage distribution
- Most popular category

## 🎓 Learning Outcomes

- ✅ SQLite database setup and configuration
- ✅ Database schema design with relationships
- ✅ SQL CRUD operations with Node.js
- ✅ Parameterized queries for security
- ✅ Foreign keys and table joins
- ✅ Database indexing for performance
- ✅ Password hashing and security
- ✅ Advanced querying and filtering
- ✅ Error handling and validation

## 🔄 Next Steps

Ready for **Day 14: Authentication Basics** - Add JWT authentication to secure the API!