# Day 14: Authentication Basics

Backend-only JWT authentication system with comprehensive security features.

## 🎯 Mini Task: Backend-only Auth (register/login user)

### Features
- ✅ **User Registration**: Secure user creation with validation
- ✅ **JWT Authentication**: Token-based authentication system
- ✅ **Password Security**: bcrypt hashing with configurable salt rounds
- ✅ **Account Security**: Failed login tracking and account lockout
- ✅ **Session Management**: Database-tracked JWT sessions
- ✅ **Profile Management**: User profile creation and updates
- ✅ **Rate Limiting**: Protection against brute force attacks
- ✅ **Input Validation**: Comprehensive server-side validation
- ✅ **Security Headers**: Helmet.js for security headers

### Topics Covered
- **JWT Introduction**: Token structure, signing, and verification
- **Password Hashing**: bcrypt implementation and salt rounds
- **Authentication Middleware**: Protected route implementation
- **Session Tracking**: Database session management
- **Security Best Practices**: Rate limiting, input validation, account lockout
- **Error Handling**: Secure error responses without information leakage

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy and configure environment variables
cp .env.example .env

# Edit .env with your settings
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Setup Database
```bash
# Create authentication database and tables
npm run setup
```

### 4. Start Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 5. Test Authentication
```bash
# Run comprehensive authentication tests
npm run test-auth
```

## 🔐 Authentication Flow

### 1. User Registration
```bash
POST /api/auth/register
{
  "username": "johndoe123",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe123",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "createdAt": "2025-09-05T10:00:00Z"
    }
  }
}
```

### 2. User Login
```bash
POST /api/auth/login
{
  "identifier": "john@example.com", // email or username
  "password": "SecurePass123!",
  "deviceInfo": "iPhone 14"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { /* user data */ },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2025-09-06T10:00:00Z"
  }
}
```

### 3. Access Protected Routes
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| POST | `/api/auth/change-password` | Change password | ✅ |

### Admin (Demo)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | Get all users | ✅ (Admin) |
| GET | `/api/admin/sessions` | Get active sessions | ✅ (Admin) |

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character (!@#$%^&*)

### Account Protection
- **Failed Login Tracking**: Tracks failed attempts per user
- **Account Lockout**: 5 failed attempts locks account for 30 minutes
- **Rate Limiting**: 5 auth attempts per 15 minutes per IP
- **Session Tracking**: All JWT sessions stored in database

### JWT Security
```javascript
// JWT Payload
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "username": "johndoe123",
  "email": "john@example.com",
  "role": "user",
  "jti": "unique-session-id", // For session tracking
  "iat": 1625097600,
  "exp": 1625184000,
  "iss": "day14-auth-system",
  "aud": "day14-users"
}
```

### Environment Variables
```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Security Configuration
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
RATE_LIMIT_WINDOW_MS=900000

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
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
);
```

### Sessions Table
```sql
CREATE TABLE user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token_jti TEXT UNIQUE NOT NULL,
  device_info TEXT,
  ip_address TEXT,
  user_agent TEXT,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🛡️ Authentication Middleware

```javascript
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = await verifyToken(token);
    
    // Verify session exists in database
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

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
```

## 🧪 Testing the System

### Automated Tests
```bash
# Run comprehensive authentication tests
npm run test-auth
```

**Test Coverage:**
- ✅ User registration with validation
- ✅ Successful login and JWT generation
- ✅ Protected route access with valid token
- ✅ Profile management operations
- ✅ Invalid login attempt handling
- ✅ Unauthorized access blocking
- ✅ Password change functionality
- ✅ Logout and session invalidation
- ✅ Weak password rejection

### Manual Testing with cURL
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"SecurePass123!"}'

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com","password":"SecurePass123!"}'

# Access protected route
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Security Best Practices Implemented

### 1. Password Security
- **Bcrypt Hashing**: Configurable salt rounds (default: 12)
- **Strong Password Policy**: Enforced complexity requirements
- **No Plain Text Storage**: Passwords never stored in plain text

### 2. Session Management
- **JWT with JTI**: Unique identifier for each session
- **Database Session Tracking**: All sessions tracked in database
- **Session Invalidation**: Logout removes session from database
- **Session Expiration**: Configurable token expiration (default: 24h)

### 3. Attack Prevention
- **Rate Limiting**: Prevents brute force attacks
- **Account Lockout**: Temporary lockout after failed attempts
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Security headers with Helmet.js

### 4. Input Validation
- **Joi Validation**: Comprehensive input validation
- **Email Format Validation**: Proper email format checking
- **Username Constraints**: Alphanumeric usernames only
- **Data Sanitization**: Automatic input sanitization

## 🎓 Learning Outcomes

- ✅ JWT token generation and verification
- ✅ Secure password hashing with bcrypt
- ✅ Authentication middleware implementation
- ✅ Session management strategies
- ✅ Rate limiting and security headers
- ✅ Input validation and sanitization
- ✅ Database session tracking
- ✅ Account lockout mechanisms
- ✅ Security best practices
- ✅ Error handling without information leakage

## 🔄 Next Steps

Ready for **Day 15: React + Auth** - Build a complete full-stack application with React frontend and authentication!