// Day 11: Backend CRUD - Student Management API
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory storage for students (acts as database)
let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    age: 20,
    course: "Computer Science",
    grade: "A",
    city: "Mumbai",
    enrollmentDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    age: 19,
    course: "Information Technology",
    grade: "A+",
    city: "Delhi",
    enrollmentDate: "2024-01-20"
  },
  {
    id: 3,
    name: "Rohan Kumar",
    email: "rohan.kumar@email.com",
    age: 21,
    course: "Electronics",
    grade: "B+",
    city: "Bangalore",
    enrollmentDate: "2024-02-01"
  }
];

// Helper function to find student by ID
const findStudentById = (id) => students.find(student => student.id === parseInt(id));

// Helper function to generate next ID
const getNextId = () => Math.max(...students.map(s => s.id), 0) + 1;

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Day 11: Student CRUD API',
    description: 'Complete Express REST API with all CRUD operations',
    endpoints: {
      'GET /students': 'Get all students',
      'GET /students/:id': 'Get student by ID',
      'POST /students': 'Create new student',
      'PUT /students/:id': 'Update student by ID',
      'DELETE /students/:id': 'Delete student by ID',
      'GET /stats': 'Get student statistics'
    },
    totalStudents: students.length
  });
});

// READ: Get all students
app.get('/students', (req, res) => {
  try {
    // Optional query parameters for filtering
    let filteredStudents = students;
    
    if (req.query.course) {
      filteredStudents = filteredStudents.filter(
        student => student.course.toLowerCase().includes(req.query.course.toLowerCase())
      );
    }
    
    if (req.query.city) {
      filteredStudents = filteredStudents.filter(
        student => student.city.toLowerCase().includes(req.query.city.toLowerCase())
      );
    }
    
    if (req.query.grade) {
      filteredStudents = filteredStudents.filter(
        student => student.grade === req.query.grade
      );
    }
    
    res.json({
      success: true,
      count: filteredStudents.length,
      data: filteredStudents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// READ: Get student by ID
app.get('/students/:id', (req, res) => {
  try {
    const student = findStudentById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found`
      });
    }
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
});

// CREATE: Add new student
app.post('/students', (req, res) => {
  try {
    const { name, email, age, course, grade, city } = req.body;
    
    // Validation
    if (!name || !email || !age || !course) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, age, course are required'
      });
    }
    
    // Check if email already exists
    const existingStudent = students.find(student => student.email === email);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }
    
    const newStudent = {
      id: getNextId(),
      name,
      email,
      age: parseInt(age),
      course,
      grade: grade || 'Not Assigned',
      city: city || 'Not Specified',
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
    
    students.push(newStudent);
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// UPDATE: Update student by ID
app.put('/students/:id', (req, res) => {
  try {
    const studentIndex = students.findIndex(student => student.id === parseInt(req.params.id));
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found`
      });
    }
    
    const { name, email, age, course, grade, city } = req.body;
    
    // Check if new email conflicts with existing student
    if (email && email !== students[studentIndex].email) {
      const existingStudent = students.find(student => student.email === email);
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists for another student'
        });
      }
    }
    
    // Update student data
    const updatedStudent = {
      ...students[studentIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(age && { age: parseInt(age) }),
      ...(course && { course }),
      ...(grade && { grade }),
      ...(city && { city })
    };
    
    students[studentIndex] = updatedStudent;
    
    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// DELETE: Delete student by ID
app.delete('/students/:id', (req, res) => {
  try {
    const studentIndex = students.findIndex(student => student.id === parseInt(req.params.id));
    
    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found`
      });
    }
    
    const deletedStudent = students[studentIndex];
    students.splice(studentIndex, 1);
    
    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Additional route: Get statistics
app.get('/stats', (req, res) => {
  try {
    const stats = {
      totalStudents: students.length,
      courseDistribution: students.reduce((acc, student) => {
        acc[student.course] = (acc[student.course] || 0) + 1;
        return acc;
      }, {}),
      gradeDistribution: students.reduce((acc, student) => {
        acc[student.grade] = (acc[student.grade] || 0) + 1;
        return acc;
      }, {}),
      cityDistribution: students.reduce((acc, student) => {
        acc[student.city] = (acc[student.city] || 0) + 1;
        return acc;
      }, {}),
      averageAge: Math.round(students.reduce((sum, student) => sum + student.age, 0) / students.length)
    };
    
    res.json({
      success: true,
      message: 'Student statistics retrieved successfully',
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

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      'GET /',
      'GET /students',
      'GET /students/:id',
      'POST /students',
      'PUT /students/:id',
      'DELETE /students/:id',
      'GET /stats'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Day 11: Student CRUD API running on http://localhost:${PORT}`);
  console.log(`📚 Total students in database: ${students.length}`);
  console.log(`🔧 Available endpoints:`);
  console.log(`   GET    /students      - Get all students`);
  console.log(`   GET    /students/:id  - Get student by ID`);
  console.log(`   POST   /students      - Create new student`);
  console.log(`   PUT    /students/:id  - Update student`);
  console.log(`   DELETE /students/:id  - Delete student`);
  console.log(`   GET    /stats         - Get statistics`);
});

export default app;