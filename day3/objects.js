// Day 3: Objects & Nested Objects

console.log("=== Day 3: Objects & Nested Objects ===\n");

// 1. Basic Objects
console.log("1. Basic Objects:");
console.log("=================");

const student = {
    name: "Alice",
    age: 20,
    course: "Computer Science",
    marks: 85
};

console.log("Student object:", student);
console.log("Name:", student.name);
console.log("Course:", student["course"]);

// Adding and modifying properties
student.email = "alice@university.edu";
student.marks = 90;
console.log("Updated student:", student);

// 2. Nested Objects
console.log("\n2. Nested Objects:");
console.log("==================");

const university = {
    name: "Tech University",
    location: {
        city: "Tech City",
        state: "CA",
        country: "USA"
    },
    departments: {
        cs: "Computer Science",
        math: "Mathematics", 
        physics: "Physics"
    },
    student: {
        name: "Bob",
        details: {
            age: 21,
            year: 3,
            gpa: 3.8
        }
    }
};

console.log("University:", university.name);
console.log("Location:", university.location.city);
console.log("Student GPA:", university.student.details.gpa);

// 3. Object Methods
console.log("\n3. Object Methods:");
console.log("==================");

const calculator = {
    total: 0,
    add(num) {
        this.total += num;
        return this;
    },
    subtract(num) {
        this.total -= num;
        return this;
    },
    multiply(num) {
        this.total *= num;
        return this;
    },
    getResult() {
        return this.total;
    }
};

const result = calculator.add(10).multiply(3).subtract(5).getResult();
console.log("Calculator result:", result);

// 4. Object Destructuring
console.log("\n4. Object Destructuring:");
console.log("========================");

const { name, age, course } = student;
console.log(`Destructured: ${name}, ${age}, ${course}`);

const { location: { city, state } } = university;
console.log(`Location: ${city}, ${state}`);

// 5. Object.keys, Object.values, Object.entries
console.log("\n5. Object Utility Methods:");
console.log("==========================");

console.log("Student keys:", Object.keys(student));
console.log("Student values:", Object.values(student));
console.log("Student entries:", Object.entries(student));

// 6. Complex Nested Structure
console.log("\n6. Complex Nested Structure:");
console.log("============================");

const classroom = {
    teacher: "Dr. Smith",
    subject: "JavaScript",
    students: [
        {
            id: 1,
            name: "Alice",
            grades: {
                midterm: 85,
                final: 92,
                assignments: [88, 90, 87]
            },
            contact: {
                email: "alice@email.com",
                phone: "123-456-7890"
            }
        },
        {
            id: 2,
            name: "Bob",
            grades: {
                midterm: 78,
                final: 85,
                assignments: [82, 79, 84]
            },
            contact: {
                email: "bob@email.com",
                phone: "098-765-4321"
            }
        }
    ]
};

console.log("First student's final grade:", classroom.students[0].grades.final);
console.log("Bob's first assignment:", classroom.students[1].grades.assignments[0]);

// Calculate averages for each student
classroom.students.forEach(student => {
    const { midterm, final, assignments } = student.grades;
    const assignmentAvg = assignments.reduce((sum, grade) => sum + grade, 0) / assignments.length;
    const overall = (midterm + final + assignmentAvg) / 3;
    console.log(`${student.name}'s average: ${overall.toFixed(1)}`);
});

// 7. Object Manipulation
console.log("\n7. Object Manipulation:");
console.log("=======================");

// Clone object
const studentCopy = { ...student };
studentCopy.name = "Alice Copy";
console.log("Original:", student.name);
console.log("Copy:", studentCopy.name);

// Merge objects
const extraInfo = { scholarship: true, year: 2 };
const fullStudent = { ...student, ...extraInfo };
console.log("Merged student:", fullStudent);

// Check if property exists
console.log("Has email?", "email" in student);
console.log("Has scholarship?", "scholarship" in student);

console.log("\n=== End of Objects ===");