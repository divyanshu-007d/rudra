// Day 14: Authentication Database Setup
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'auth.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to Authentication database');
  }
});

// Create authentication tables
const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table with enhanced security fields
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid TEXT UNIQUE NOT NULL,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          first_name TEXT,
          last_name TEXT,
          role TEXT DEFAULT 'user',
          is_active BOOLEAN DEFAULT 1,
          email_verified BOOLEAN DEFAULT 0,
          failed_login_attempts INTEGER DEFAULT 0,
          locked_until DATETIME NULL,
          last_login DATETIME NULL,
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

      // Sessions table for tracking active sessions
      db.run(`
        CREATE TABLE IF NOT EXISTS user_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token_jti TEXT UNIQUE NOT NULL,
          device_info TEXT,
          ip_address TEXT,
          user_agent TEXT,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating sessions table:', err.message);
          reject(err);
        } else {
          console.log('✅ Sessions table created/verified');
        }
      });

      // Password reset tokens table
      db.run(`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token_hash TEXT NOT NULL,
          expires_at DATETIME NOT NULL,
          used BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating password reset tokens table:', err.message);
          reject(err);
        } else {
          console.log('✅ Password reset tokens table created/verified');
        }
      });

      // User profiles table for additional user data
      db.run(`
        CREATE TABLE IF NOT EXISTS user_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER UNIQUE NOT NULL,
          bio TEXT,
          avatar_url TEXT,
          phone TEXT,
          date_of_birth DATE,
          country TEXT,
          timezone TEXT DEFAULT 'UTC',
          preferences TEXT, -- JSON object
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('❌ Error creating user profiles table:', err.message);
          reject(err);
        } else {
          console.log('✅ User profiles table created/verified');
          resolve();
        }
      });

      // Create indexes for better performance
      db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token_jti)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_reset_tokens_user_id ON password_reset_tokens(user_id)`);
      
      console.log('✅ Database indexes created/verified');
    });
  });
};

// Run setup
createTables()
  .then(() => {
    console.log('🎉 Authentication database setup completed!');
    console.log('📋 Created tables:');
    console.log('   • users (with security features)');
    console.log('   • user_sessions (JWT session tracking)');
    console.log('   • password_reset_tokens (password recovery)');
    console.log('   • user_profiles (extended user data)');
    
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