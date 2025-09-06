// Day 15: Authentication Server
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// In-memory user storage (in production, use a real database)
const users = [];
const sessions = new Map();

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    // Store session
    sessions.set(newUser.id, {
      token,
      createdAt: new Date(),
      lastAccess: new Date()
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/username and password are required'
      });
    }

    // Find user
    const user = users.find(u => 
      u.email === identifier || u.username === identifier
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Update session
    sessions.set(user.id, {
      token,
      createdAt: new Date(),
      lastAccess: new Date()
    });

    // Update user's last access
    user.lastAccess = new Date().toISOString();

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Get current user
app.get('/api/auth/me', verifyToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Logout
app.post('/api/auth/logout', verifyToken, (req, res) => {
  try {
    // Remove session
    sessions.delete(req.user.id);

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
});

// Update profile
app.put('/api/auth/profile', verifyToken, async (req, res) => {
  try {
    const { username, email, firstName, lastName, bio, location, website } = req.body;
    
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if username/email is already taken by another user
    if (username && username !== user.username) {
      const existingUser = users.find(u => u.username === username && u.id !== user.id);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Username already taken'
        });
      }
    }

    if (email && email !== user.email) {
      const existingUser = users.find(u => u.email === email && u.id !== user.id);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already taken'
        });
      }
    }

    // Update user data
    Object.assign(user, {
      username: username || user.username,
      email: email || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      bio: bio || user.bio,
      location: location || user.location,
      website: website || user.website,
      updatedAt: new Date().toISOString()
    });

    // Return updated user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: userWithoutPassword
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during profile update'
    });
  }
});

// Change password
app.put('/api/auth/password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    user.password = hashedNewPassword;
    user.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during password change'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Authentication Server running on port ${PORT}`);
  console.log(`📱 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 API Docs: http://localhost:${PORT}/api/`);
  
  // Create a demo user for testing
  setTimeout(async () => {
    const demoUserExists = users.find(u => u.email === 'demo@example.com');
    if (!demoUserExists) {
      const hashedPassword = await bcrypt.hash('DemoPass123!', 12);
      const demoUser = {
        id: 'demo-user-001',
        username: 'demo_user',
        email: 'demo@example.com',
        password: hashedPassword,
        firstName: 'Demo',
        lastName: 'User',
        bio: 'This is a demo user account for testing the authentication system.',
        location: 'Demo City, Demo Country',
        website: 'https://demo-user.example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      users.push(demoUser);
      console.log('✅ Demo user created: demo@example.com / DemoPass123!');
    }
  }, 1000);
});

export default app;