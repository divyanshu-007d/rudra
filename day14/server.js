// Day 14: Authentication Basics - JWT Backend System
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const dbPath = join(__dirname, process.env.DB_PATH || 'auth.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to Authentication database');
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

app.use('/api/auth', authLimiter);
app.use('/api', generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Validation schemas
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, uppercase letter, number, and special character'
    }),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional()
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(), // Can be email or username
  password: Joi.string().required()
});

const profileUpdateSchema = Joi.object({
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  bio: Joi.string().max(500).optional(),
  phone: Joi.string().max(20).optional(),
  dateOfBirth: Joi.date().optional(),
  country: Joi.string().max(100).optional(),
  timezone: Joi.string().max(50).optional()
});

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

// JWT utility functions
const generateTokens = (user) => {
  const jti = uuidv4(); // Unique token identifier
  
  const accessToken = jwt.sign(
    {
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      role: user.role,
      jti
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      issuer: 'day14-auth-system',
      audience: 'day14-users'
    }
  );

  return { accessToken, jti };
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = await verifyToken(token);
    
    // Check if session exists and is valid
    const session = await dbGet(
      'SELECT * FROM user_sessions WHERE token_jti = ? AND expires_at > datetime("now")',
      [decoded.jti]
    );

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }

    // Check if user is still active
    const user = await dbGet(
      'SELECT * FROM users WHERE id = ? AND is_active = 1',
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🔐 Day 14: Authentication System',
    description: 'Backend-only JWT authentication with register/login',
    features: [
      'User registration with validation',
      'Secure login with JWT tokens',
      'Password hashing with bcrypt',
      'Rate limiting and security headers',
      'Session management',
      'Account lockout protection',
      'User profile management'
    ],
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login user',
        'POST /api/auth/logout': 'Logout user',
        'GET /api/auth/me': 'Get current user profile',
        'PUT /api/auth/profile': 'Update user profile',
        'POST /api/auth/change-password': 'Change password'
      },
      admin: {
        'GET /api/admin/users': 'Get all users (admin only)',
        'GET /api/admin/sessions': 'Get active sessions'
      }
    },
    security: {
      'Password Requirements': 'Min 8 chars, uppercase, lowercase, number, special char',
      'Rate Limiting': '5 auth attempts per 15 minutes',
      'Account Lockout': '5 failed attempts locks account for 30 minutes',
      'JWT Expiration': '24 hours',
      'Session Tracking': 'All sessions tracked in database'
    }
  });
});

// AUTHENTICATION ROUTES

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { username, email, password, firstName, lastName } = value;

    // Check if user already exists
    const existingUser = await dbGet(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const userUuid = uuidv4();
    const result = await dbRun(`
      INSERT INTO users (uuid, username, email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [userUuid, username, email, passwordHash, firstName || null, lastName || null]);

    // Create user profile
    await dbRun(`
      INSERT INTO user_profiles (user_id) VALUES (?)
    `, [result.id]);

    // Fetch created user (without password)
    const newUser = await dbGet(`
      SELECT id, uuid, username, email, first_name, last_name, role, created_at
      FROM users WHERE id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { identifier, password } = value;

    // Find user by email or username
    const user = await dbGet(`
      SELECT * FROM users 
      WHERE (email = ? OR username = ?) AND is_active = 1
    `, [identifier, identifier]);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      // Increment failed login attempts
      const newFailedAttempts = user.failed_login_attempts + 1;
      const lockUntil = newFailedAttempts >= 5 ? 
        new Date(Date.now() + 30 * 60 * 1000).toISOString() : // Lock for 30 minutes
        null;

      await dbRun(`
        UPDATE users 
        SET failed_login_attempts = ?, locked_until = ?
        WHERE id = ?
      `, [newFailedAttempts, lockUntil, user.id]);

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        remainingAttempts: Math.max(5 - newFailedAttempts, 0)
      });
    }

    // Reset failed login attempts and update last login
    await dbRun(`
      UPDATE users 
      SET failed_login_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [user.id]);

    // Generate JWT tokens
    const { accessToken, jti } = generateTokens(user);

    // Store session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await dbRun(`
      INSERT INTO user_sessions (user_id, token_jti, device_info, ip_address, user_agent, expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      user.id,
      jti,
      req.body.deviceInfo || 'Unknown Device',
      req.ip || req.connection.remoteAddress,
      req.get('User-Agent') || 'Unknown',
      expiresAt.toISOString()
    ]);

    // Return user data (without sensitive info)
    const userData = {
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      lastLogin: user.last_login,
      createdAt: user.created_at
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        accessToken,
        expiresAt: expiresAt.toISOString()
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Logout user
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    // Remove session from database
    await dbRun('DELETE FROM user_sessions WHERE token_jti = ?', [req.user.jti]);

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
});

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet(`
      SELECT 
        u.id, u.uuid, u.username, u.email, u.first_name, u.last_name, 
        u.role, u.last_login, u.created_at,
        p.bio, p.avatar_url, p.phone, p.date_of_birth, p.country, p.timezone
      FROM users u
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = ?
    `, [req.user.id]);

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
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    // Validate input
    const { error, value } = profileUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { firstName, lastName, bio, phone, dateOfBirth, country, timezone } = value;

    // Update user basic info
    if (firstName !== undefined || lastName !== undefined) {
      await dbRun(`
        UPDATE users 
        SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name)
        WHERE id = ?
      `, [firstName, lastName, req.user.id]);
    }

    // Update user profile
    await dbRun(`
      UPDATE user_profiles 
      SET 
        bio = COALESCE(?, bio),
        phone = COALESCE(?, phone),
        date_of_birth = COALESCE(?, date_of_birth),
        country = COALESCE(?, country),
        timezone = COALESCE(?, timezone),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `, [bio, phone, dateOfBirth, country, timezone, req.user.id]);

    // Fetch updated profile
    const updatedUser = await dbGet(`
      SELECT 
        u.id, u.uuid, u.username, u.email, u.first_name, u.last_name, 
        u.role, u.last_login, u.created_at,
        p.bio, p.avatar_url, p.phone, p.date_of_birth, p.country, p.timezone
      FROM users u
      LEFT JOIN user_profiles p ON u.id = p.user_id
      WHERE u.id = ?
    `, [req.user.id]);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// Change password
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Validate new password
    const { error } = Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).validate(newPassword);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'New password must contain at least one lowercase letter, uppercase letter, number, and special character'
      });
    }

    // Get current user
    const user = await dbGet('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await dbRun(`
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newPasswordHash, req.user.id]);

    // Invalidate all user sessions except current one
    await dbRun(`
      DELETE FROM user_sessions 
      WHERE user_id = ? AND token_jti != ?
    `, [req.user.id, req.user.jti]);

    res.json({
      success: true,
      message: 'Password changed successfully. Other sessions have been logged out.'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    });
  }
});

// ADMIN ROUTES (for demo purposes)

// Get all users (admin only)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const users = await dbAll(`
      SELECT 
        u.id, u.uuid, u.username, u.email, u.first_name, u.last_name,
        u.role, u.is_active, u.email_verified, u.failed_login_attempts,
        u.last_login, u.created_at,
        COUNT(s.id) as active_sessions
      FROM users u
      LEFT JOIN user_sessions s ON u.id = s.user_id AND s.expires_at > datetime('now')
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Get active sessions
app.get('/api/admin/sessions', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const sessions = await dbAll(`
      SELECT 
        s.id, s.token_jti, s.device_info, s.ip_address, s.user_agent,
        s.expires_at, s.created_at,
        u.username, u.email
      FROM user_sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.expires_at > datetime('now')
      ORDER BY s.created_at DESC
    `);

    res.json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    console.error('Admin sessions fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sessions',
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
  console.log(`🚀 Day 14: Authentication API running on http://localhost:${PORT}`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Using default (change in production!)'}`);
  console.log(`💾 Database: ${dbPath}`);
  console.log(`🛡️ Security Features: Rate limiting, password hashing, session tracking`);
  console.log(`📋 Setup commands:`);
  console.log(`   npm run setup    - Create authentication database`);
  console.log(`   npm run test-auth - Test authentication endpoints`);
});

export default app;