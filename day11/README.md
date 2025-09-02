# Day 11: Backend CRUD - Student Management API

Complete Express.js REST API with full CRUD operations for student management.

## 🎯 Mini Task: Student CRUD API

### Features
- ✅ **GET** `/students` - Retrieve all students (with filtering)
- ✅ **GET** `/students/:id` - Retrieve student by ID
- ✅ **POST** `/students` - Create new student
- ✅ **PUT** `/students/:id` - Update existing student
- ✅ **DELETE** `/students/:id` - Delete student
- ✅ **GET** `/stats` - Get student statistics

### Topics Covered
- Express routes: GET, POST, PUT, DELETE
- Request/Response handling
- JSON middleware
- Error handling
- Data validation
- In-memory data storage
- Query parameters for filtering
- HTTP status codes

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Test API endpoints
npm test
```

## 📝 API Endpoints

### Base URL: `http://localhost:3000`

#### 1. Get All Students
```
GET /students
Optional Query Parameters:
- ?course=Computer Science
- ?city=Mumbai
- ?grade=A
```

#### 2. Get Student by ID
```
GET /students/1
```

#### 3. Create New Student
```
POST /students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "age": 20,
  "course": "Computer Science",
  "grade": "A",
  "city": "Mumbai"
}
```

#### 4. Update Student
```
PUT /students/1
Content-Type: application/json

{
  "grade": "A+",
  "city": "Delhi"
}
```

#### 5. Delete Student
```
DELETE /students/1
```

#### 6. Get Statistics
```
GET /stats
```

## 🧪 Testing

The API comes with a built-in test script that validates all CRUD operations:

```bash
# Make sure server is running first
npm start

# In another terminal, run tests
npm test
```

## 📊 Sample Data

The API starts with 3 pre-loaded students:
1. Aarav Sharma (Computer Science, Mumbai)
2. Priya Patel (Information Technology, Delhi)  
3. Rohan Kumar (Electronics, Bangalore)

## 🔧 Key Features

### Data Validation
- Required fields validation
- Email uniqueness check
- Proper error messages

### Error Handling
- 404 for missing resources
- 400 for validation errors
- 500 for server errors

### Query Filtering
```bash
# Filter by course
GET /students?course=Computer

# Filter by city
GET /students?city=Mumbai

# Filter by grade
GET /students?grade=A
```

### Response Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "count": 5
}
```

## 🎓 Learning Outcomes

- ✅ Express.js server setup
- ✅ RESTful API design principles
- ✅ HTTP methods and status codes
- ✅ Request validation and error handling
- ✅ JSON data manipulation
- ✅ CORS and middleware usage
- ✅ API testing strategies

## 🔄 Next Steps

Ready for **Day 12: React + API Integration** - Connect this backend with a React frontend!