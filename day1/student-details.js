// Day 1 Mini Task: Print Student Details from an Object
// Create a student object and print their details

console.log("=== Day 1 Mini Task: Student Details ===\n");

// Create a student object with various details
const student = {
    // Basic Information
    name: "Alex Johnson",
    age: 20,
    studentId: "STU2024001",
    email: "alex.johnson@university.edu",
    
    // Academic Information
    course: "Computer Science",
    year: "Second Year",
    semester: "Fall 2024",
    gpa: 3.7,
    
    // Contact Information
    phone: "+1-555-0123",
    address: {
        street: "123 University Ave",
        city: "Tech City",
        state: "CA",
        zipCode: "90210"
    },
    
    // Academic Details
    subjects: ["JavaScript", "Data Structures", "Web Development", "Database Systems"],
    marks: {
        javascript: 92,
        dataStructures: 88,
        webDevelopment: 95,
        databaseSystems: 85
    },
    
    // Additional Information
    isActive: true,
    scholarshipHolder: true,
    clubs: ["Coding Club", "Debate Society"],
    graduationYear: 2026
};

// Function to print student details in a formatted way
function printStudentDetails(studentObj) {
    console.log("📚 STUDENT PROFILE");
    console.log("==================");
    
    // Basic Information
    console.log(`👤 Name: ${studentObj.name}`);
    console.log(`🎂 Age: ${studentObj.age} years old`);
    console.log(`🆔 Student ID: ${studentObj.studentId}`);
    console.log(`📧 Email: ${studentObj.email}`);
    console.log(`📞 Phone: ${studentObj.phone}`);
    
    // Academic Information
    console.log("\n🎓 ACADEMIC INFORMATION");
    console.log("=======================");
    console.log(`📖 Course: ${studentObj.course}`);
    console.log(`📅 Year: ${studentObj.year}`);
    console.log(`📆 Semester: ${studentObj.semester}`);
    console.log(`📊 GPA: ${studentObj.gpa}/4.0`);
    console.log(`🎯 Graduation Year: ${studentObj.graduationYear}`);
    console.log(`🏆 Scholarship Holder: ${studentObj.scholarshipHolder ? 'Yes' : 'No'}`);
    
    // Address Information
    console.log("\n🏠 ADDRESS");
    console.log("==========");
    console.log(`📍 ${studentObj.address.street}`);
    console.log(`   ${studentObj.address.city}, ${studentObj.address.state} ${studentObj.address.zipCode}`);
    
    // Subjects
    console.log("\n📚 ENROLLED SUBJECTS");
    console.log("====================");
    studentObj.subjects.forEach((subject, index) => {
        console.log(`${index + 1}. ${subject}`);
    });
    
    // Marks
    console.log("\n📋 ACADEMIC PERFORMANCE");
    console.log("=======================");
    let totalMarks = 0;
    let subjectCount = 0;
    
    for (let subject in studentObj.marks) {
        const mark = studentObj.marks[subject];
        console.log(`📝 ${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${mark}%`);
        totalMarks += mark;
        subjectCount++;
    }
    
    const average = (totalMarks / subjectCount).toFixed(1);
    console.log(`📊 Average Score: ${average}%`);
    
    // Extracurricular Activities
    console.log("\n🎯 EXTRACURRICULAR ACTIVITIES");
    console.log("=============================");
    if (studentObj.clubs.length > 0) {
        studentObj.clubs.forEach((club, index) => {
            console.log(`${index + 1}. ${club}`);
        });
    } else {
        console.log("No clubs joined yet");
    }
    
    // Status
    console.log("\n✅ STATUS");
    console.log("=========");
    console.log(`📈 Active Student: ${studentObj.isActive ? 'Yes' : 'No'}`);
    
    console.log("\n" + "=".repeat(50));
    console.log("📝 Student details printed successfully!");
    console.log("=".repeat(50));
}

// Call the function to print student details
printStudentDetails(student);

// Additional demonstration: Accessing individual properties
console.log("\n🔍 ACCESSING INDIVIDUAL PROPERTIES");
console.log("===================================");
console.log(`Direct access - Student Name: ${student.name}`);
console.log(`Direct access - Course: ${student.course}`);
console.log(`Direct access - First Subject: ${student.subjects[0]}`);
console.log(`Direct access - JavaScript Score: ${student.marks.javascript}%`);
console.log(`Direct access - City: ${student.address.city}`);

// Demonstration: Using different ways to access object properties
console.log("\n🛠️  PROPERTY ACCESS METHODS");
console.log("============================");
console.log("1. Dot notation:", student.name);
console.log("2. Bracket notation:", student['name']);
console.log("3. Dynamic property access:", student[Object.keys(student)[0]]);

console.log("\n🎉 Day 1 Mini Task Completed Successfully!");