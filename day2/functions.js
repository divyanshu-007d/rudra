// Day 2: Functions & Conditionals

console.log("=== Day 2: Functions & Conditionals ===\n");

// 1. Function Declarations
console.log("1. Function Declarations:");
console.log("========================");

// Basic function declaration
function greetStudent(name) {
    return `Hello, ${name}! Welcome to Day 2!`;
}

// Function with multiple parameters
function calculateGrade(marks, totalMarks) {
    const percentage = (marks / totalMarks) * 100;
    return percentage;
}

// Function with default parameters
function introduceStudent(name, course = "Computer Science") {
    return `${name} is studying ${course}`;
}

console.log(greetStudent("Alice"));
console.log("Grade:", calculateGrade(85, 100) + "%");
console.log(introduceStudent("Bob"));
console.log(introduceStudent("Charlie", "Mathematics"));

// 2. Function Expressions
console.log("\n2. Function Expressions:");
console.log("========================");

// Anonymous function assigned to variable
const multiply = function(a, b) {
    return a * b;
};

// Arrow function (ES6)
const divide = (a, b) => {
    return b !== 0 ? a / b : "Cannot divide by zero";
};

// Short arrow function
const square = x => x * x;

// Arrow function with no parameters
const getCurrentTime = () => new Date().toLocaleTimeString();

console.log("Multiply 5 * 3:", multiply(5, 3));
console.log("Divide 10 / 2:", divide(10, 2));
console.log("Square of 7:", square(7));
console.log("Current time:", getCurrentTime());

// 3. Conditional Statements
console.log("\n3. Conditional Statements:");
console.log("==========================");

// If-else function
function evaluateGrade(percentage) {
    if (percentage >= 90) {
        return "A+ Grade - Excellent!";
    } else if (percentage >= 80) {
        return "A Grade - Very Good!";
    } else if (percentage >= 70) {
        return "B Grade - Good!";
    } else if (percentage >= 60) {
        return "C Grade - Satisfactory";
    } else if (percentage >= 50) {
        return "D Grade - Pass";
    } else {
        return "F Grade - Fail";
    }
}

// Testing different grades
const testScores = [95, 87, 72, 65, 45];
testScores.forEach(score => {
    console.log(`Score ${score}%: ${evaluateGrade(score)}`);
});

// Switch statement function
function getDayActivity(day) {
    switch (day.toLowerCase()) {
        case 'monday':
            return "JavaScript Basics";
        case 'tuesday':
            return "Functions & Loops";
        case 'wednesday':
            return "Arrays & Objects";
        case 'thursday':
            return "Node.js Introduction";
        case 'friday':
            return "Express.js Basics";
        case 'saturday':
        case 'sunday':
            return "Practice & Review";
        default:
            return "Invalid day";
    }
}

console.log("\nWeekly Learning Schedule:");
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
days.forEach(day => {
    console.log(`${day}: ${getDayActivity(day)}`);
});

// 4. Functions with Complex Logic
console.log("\n4. Advanced Function Examples:");
console.log("==============================");

// Function to check if a student passed all subjects
function checkAllSubjectsPassed(marks) {
    const passingGrade = 40;
    for (let subject in marks) {
        if (marks[subject] < passingGrade) {
            return `Failed in ${subject} with ${marks[subject]}%`;
        }
    }
    return "Passed in all subjects!";
}

// Function to calculate total and average
function calculateStudentStats(marks) {
    const subjects = Object.keys(marks);
    const total = Object.values(marks).reduce((sum, mark) => sum + mark, 0);
    const average = total / subjects.length;
    
    return {
        subjects: subjects,
        total: total,
        average: average.toFixed(2),
        grade: evaluateGrade(average)
    };
}

// Test student data
const studentMarks = {
    javascript: 88,
    mathematics: 92,
    physics: 78,
    english: 85
};

console.log("Checking if student passed:", checkAllSubjectsPassed(studentMarks));

const stats = calculateStudentStats(studentMarks);
console.log("\nStudent Statistics:");
console.log(`Subjects: ${stats.subjects.join(', ')}`);
console.log(`Total Marks: ${stats.total}`);
console.log(`Average: ${stats.average}%`);
console.log(`Grade: ${stats.grade}`);

// 5. Higher-Order Functions
console.log("\n5. Higher-Order Functions:");
console.log("==========================");

// Function that takes another function as parameter
function processMarks(marks, processor) {
    return marks.map(processor);
}

// Functions to pass as arguments
const addBonus = (mark) => Math.min(mark + 5, 100); // Add 5 bonus points, max 100
const applyPenalty = (mark) => Math.max(mark - 3, 0); // Subtract 3 points, min 0

const originalMarks = [75, 88, 92, 67, 94];
console.log("Original marks:", originalMarks);
console.log("With bonus:", processMarks(originalMarks, addBonus));
console.log("With penalty:", processMarks(originalMarks, applyPenalty));

// Function that returns another function (closure)
function createGradeChecker(passingGrade) {
    return function(mark) {
        return mark >= passingGrade ? "Pass" : "Fail";
    };
}

const strictChecker = createGradeChecker(75);
const lenientChecker = createGradeChecker(50);

console.log("\nGrade checking with different standards:");
console.log(`Mark 70 - Strict (>=75): ${strictChecker(70)}`);
console.log(`Mark 70 - Lenient (>=50): ${lenientChecker(70)}`);

console.log("\n=== End of Functions & Conditionals ===");