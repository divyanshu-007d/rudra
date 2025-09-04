// Day 13: Database Setup Script
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'notes.db');

// Create database and tables
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Create tables
const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating users table:', err.message);
          reject(err);
        } else {
          console.log('✅ Users table created/verified');
        }
      });

      // Create categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          color TEXT DEFAULT '#6c757d',
          user_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id),
          UNIQUE(name, user_id)
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating categories table:', err.message);
          reject(err);
        } else {
          console.log('✅ Categories table created/verified');
        }
      });

      // Create notes table
      db.run(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          content TEXT,
          category_id INTEGER,
          user_id INTEGER,
          is_favorite BOOLEAN DEFAULT 0,
          is_archived BOOLEAN DEFAULT 0,
          tags TEXT, -- JSON array of tags
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories (id),
          FOREIGN KEY (user_id) REFERENCES users (id)
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating notes table:', err.message);
          reject(err);
        } else {
          console.log('✅ Notes table created/verified');
          resolve();
        }
      });

      // Create indexes for better performance
      db.run(`CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_notes_category_id ON notes(category_id)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id)`);
      
      console.log('✅ Database indexes created/verified');
    });
  });
};

// Run setup
createTables()
  .then(() => {
    console.log('🎉 Database setup completed successfully!');
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('✅ Database connection closed');
      }
    });
  })
  .catch((err) => {
    console.error('💥 Database setup failed:', err.message);
    process.exit(1);
  });