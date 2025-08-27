// Day 5: Express.js Basics - Student API

const express = require('express');
const app = express();

console.log("=== Day 5: Express.js Basics ===\n");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample student data
let students = [
    { id: 1, name: "Alice Johnson", course: "Computer Science", grade: "A" },
    { id: 2, name: "Bob Smith", course: "Mathematics", grade: "B+" },
    { id: 3, name: "Charlie Brown", course: "Physics", grade: "A-" },
    { id: 4, name: "Diana Prince", course: "Chemistry", grade: "A" },
    { id: 5, name: "Eva Garcia", course: "Biology", grade: "B" }
];

// Routes
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Day 5 - Express.js Student API! 🎓",
        endpoints: [
            "GET /students - List all students",
            "GET /students/:id - Get student by ID", 
            "POST /students - Add new student"
        ]
    });
});

// GET all students
app.get('/students', (req, res) => {
    console.log("📚 Fetching all students");
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }
    
    console.log(`👤 Fetching student: ${student.name}`);
    res.json({
        success: true,
        data: student
    });
});

// POST new student
app.post('/students', (req, res) => {
    const { name, course, grade } = req.body;
    
    if (!name || !course) {
        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });
    }
    
    const newStudent = {
        id: students.length + 1,
        name,
        course,
        grade: grade || "N/A"
    };
    
    students.push(newStudent);
    console.log(`✅ Added new student: ${newStudent.name}`);
    
    res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: newStudent
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log("📡 API Endpoints:");
    console.log(`   - GET http://localhost:${PORT}/students`);
    console.log(`   - GET http://localhost:${PORT}/students/:id`);
    console.log(`   - POST http://localhost:${PORT}/students`);
    console.log("\n✅ Day 5 Mini Task: Student API ready!");
});