// Day 3 Mini Task: Simple Student Marks Calculator

console.log("=== Day 3 Mini Task: Student Marks Calculator ===\n");

// Student data
const students = [
    {
        name: "Alice",
        subjects: {
            math: 85,
            science: 92,
            english: 78
        }
    },
    {
        name: "Bob", 
        subjects: {
            math: 90,
            science: 88,
            english: 85
        }
    },
    {
        name: "Charlie",
        subjects: {
            math: 75,
            science: 80,
            english: 88
        }
    }
];

// Calculator functions
function calculateTotal(subjects) {
    return Object.values(subjects).reduce((sum, mark) => sum + mark, 0);
}

function calculateAverage(subjects) {
    const total = calculateTotal(subjects);
    return total / Object.keys(subjects).length;
}

function getGrade(average) {
    if (average >= 90) return "A";
    if (average >= 80) return "B"; 
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
}

// Process each student
console.log("📊 Student Marks Report:");
console.log("========================");

students.forEach(student => {
    const total = calculateTotal(student.subjects);
    const average = calculateAverage(student.subjects);
    const grade = getGrade(average);
    
    console.log(`\n🎓 ${student.name}:`);
    console.log(`   Math: ${student.subjects.math}`);
    console.log(`   Science: ${student.subjects.science}`);
    console.log(`   English: ${student.subjects.english}`);
    console.log(`   Total: ${total}`);
    console.log(`   Average: ${average.toFixed(1)}`);
    console.log(`   Grade: ${grade}`);
});

// Class statistics
const allAverages = students.map(s => calculateAverage(s.subjects));
const classAverage = allAverages.reduce((sum, avg) => sum + avg, 0) / allAverages.length;
const topStudent = students.reduce((top, current) => {
    return calculateAverage(current.subjects) > calculateAverage(top.subjects) ? current : top;
});

console.log("\n📈 Class Statistics:");
console.log("===================");
console.log(`Class Average: ${classAverage.toFixed(1)}`);
console.log(`Top Student: ${topStudent.name} (${calculateAverage(topStudent.subjects).toFixed(1)})`);

console.log("\n✅ Calculator completed!");