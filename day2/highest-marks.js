// Day 2 Mini Task: Find Highest Marks from an Array
// Implement multiple approaches to find the highest marks

console.log("=== Day 2 Mini Task: Find Highest Marks ===\n");

// Sample data - student marks in different subjects
const mathMarks = [85, 92, 78, 96, 88, 91, 73, 89, 94, 87];
const scienceMarks = [88, 79, 95, 84, 90, 87, 92, 86, 83, 91];
const englishMarks = [76, 89, 82, 91, 85, 88, 79, 93, 87, 84];

// Student names corresponding to marks
const studentNames = [
    "Alice", "Bob", "Charlie", "Diana", "Eva", 
    "Frank", "Grace", "Henry", "Ivy", "Jack"
];

// Complex student data with multiple subjects
const students = [
    { name: "Alice", math: 85, science: 88, english: 76 },
    { name: "Bob", math: 92, science: 79, english: 89 },
    { name: "Charlie", math: 78, science: 95, english: 82 },
    { name: "Diana", math: 96, science: 84, english: 91 },
    { name: "Eva", math: 88, science: 90, english: 85 },
    { name: "Frank", math: 91, science: 87, english: 88 },
    { name: "Grace", math: 73, science: 92, english: 79 },
    { name: "Henry", math: 89, science: 86, english: 93 },
    { name: "Ivy", math: 94, science: 83, english: 87 },
    { name: "Jack", math: 87, science: 91, english: 84 }
];

console.log("📚 FINDING HIGHEST MARKS - DIFFERENT APPROACHES");
console.log("=".repeat(50));

// Method 1: Using Math.max() with spread operator
console.log("\n1. Using Math.max() with spread operator:");
console.log("==========================================");

function findHighestMarksSpread(marks) {
    return Math.max(...marks);
}

const highestMath = findHighestMarksSpread(mathMarks);
const highestScience = findHighestMarksSpread(scienceMarks);
const highestEnglish = findHighestMarksSpread(englishMarks);

console.log(`📊 Math - Highest Mark: ${highestMath}`);
console.log(`🔬 Science - Highest Mark: ${highestScience}`);
console.log(`📝 English - Highest Mark: ${highestEnglish}`);

// Method 2: Using traditional for loop
console.log("\n2. Using traditional for loop:");
console.log("===============================");

function findHighestMarksLoop(marks) {
    let highest = marks[0];
    let index = 0;
    
    for (let i = 1; i < marks.length; i++) {
        if (marks[i] > highest) {
            highest = marks[i];
            index = i;
        }
    }
    
    return { value: highest, index: index };
}

const mathResult = findHighestMarksLoop(mathMarks);
console.log(`📊 Math - Highest: ${mathResult.value} (Student: ${studentNames[mathResult.index]})`);

const scienceResult = findHighestMarksLoop(scienceMarks);
console.log(`🔬 Science - Highest: ${scienceResult.value} (Student: ${studentNames[scienceResult.index]})`);

const englishResult = findHighestMarksLoop(englishMarks);
console.log(`📝 English - Highest: ${englishResult.value} (Student: ${studentNames[englishResult.index]})`);

// Method 3: Using Array.reduce()
console.log("\n3. Using Array.reduce():");
console.log("========================");

function findHighestMarksReduce(marks) {
    return marks.reduce((max, current) => current > max ? current : max);
}

console.log(`📊 Math - Highest (reduce): ${findHighestMarksReduce(mathMarks)}`);
console.log(`🔬 Science - Highest (reduce): ${findHighestMarksReduce(scienceMarks)}`);
console.log(`📝 English - Highest (reduce): ${findHighestMarksReduce(englishMarks)}`);

// Method 4: Using Array.sort()
console.log("\n4. Using Array.sort():");
console.log("======================");

function findHighestMarksSort(marks) {
    const sortedMarks = [...marks].sort((a, b) => b - a); // Descending order
    return sortedMarks[0];
}

console.log(`📊 Math - Highest (sort): ${findHighestMarksSort(mathMarks)}`);
console.log(`🔬 Science - Highest (sort): ${findHighestMarksSort(scienceMarks)}`);
console.log(`📝 English - Highest (sort): ${findHighestMarksSort(englishMarks)}`);

// Method 5: Finding highest marks with student information
console.log("\n5. Finding highest marks with student details:");
console.log("==============================================");

function findTopStudentInSubject(students, subject) {
    let topStudent = students[0];
    
    for (let i = 1; i < students.length; i++) {
        if (students[i][subject] > topStudent[subject]) {
            topStudent = students[i];
        }
    }
    
    return topStudent;
}

const topMathStudent = findTopStudentInSubject(students, 'math');
const topScienceStudent = findTopStudentInSubject(students, 'science');
const topEnglishStudent = findTopStudentInSubject(students, 'english');

console.log(`🏆 Top Math Student: ${topMathStudent.name} with ${topMathStudent.math} marks`);
console.log(`🏆 Top Science Student: ${topScienceStudent.name} with ${topScienceStudent.science} marks`);
console.log(`🏆 Top English Student: ${topEnglishStudent.name} with ${topEnglishStudent.english} marks`);

// Method 6: Finding overall highest performer
console.log("\n6. Finding overall highest performer:");
console.log("====================================");

function findOverallTopStudent(students) {
    let topStudent = null;
    let highestTotal = -1;
    
    for (const student of students) {
        const total = student.math + student.science + student.english;
        if (total > highestTotal) {
            highestTotal = total;
            topStudent = { ...student, total };
        }
    }
    
    return topStudent;
}

const overallTop = findOverallTopStudent(students);
console.log(`🥇 Overall Top Student: ${overallTop.name}`);
console.log(`   Math: ${overallTop.math}, Science: ${overallTop.science}, English: ${overallTop.english}`);
console.log(`   Total: ${overallTop.total} marks`);
console.log(`   Average: ${(overallTop.total / 3).toFixed(1)}%`);

// Method 7: Finding top 3 students in each subject
console.log("\n7. Top 3 students in each subject:");
console.log("==================================");

function findTop3InSubject(students, subject) {
    return students
        .map(student => ({ name: student.name, mark: student[subject] }))
        .sort((a, b) => b.mark - a.mark)
        .slice(0, 3);
}

const subjects = ['math', 'science', 'english'];
const subjectEmojis = { math: '📊', science: '🔬', english: '📝' };

subjects.forEach(subject => {
    const top3 = findTop3InSubject(students, subject);
    console.log(`\n${subjectEmojis[subject]} Top 3 in ${subject.charAt(0).toUpperCase() + subject.slice(1)}:`);
    top3.forEach((student, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        console.log(`   ${medal} ${student.name}: ${student.mark} marks`);
    });
});

// Method 8: Statistical analysis
console.log("\n8. Statistical Analysis:");
console.log("========================");

function analyzeMarks(marks, subjectName) {
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
    const aboveAverage = marks.filter(mark => mark > average).length;
    
    return {
        subject: subjectName,
        highest,
        lowest,
        average: average.toFixed(1),
        aboveAverage,
        total: marks.length
    };
}

const mathStats = analyzeMarks(mathMarks, "Mathematics");
const scienceStats = analyzeMarks(scienceMarks, "Science");
const englishStats = analyzeMarks(englishMarks, "English");

[mathStats, scienceStats, englishStats].forEach(stats => {
    console.log(`\n📈 ${stats.subject} Statistics:`);
    console.log(`   Highest: ${stats.highest} marks`);
    console.log(`   Lowest: ${stats.lowest} marks`);
    console.log(`   Average: ${stats.average} marks`);
    console.log(`   Students above average: ${stats.aboveAverage}/${stats.total}`);
});

// Method 9: Performance comparison
console.log("\n9. Performance Comparison of Methods:");
console.log("====================================");

const testArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 100));

console.time("Math.max() method");
Math.max(...testArray);
console.timeEnd("Math.max() method");

console.time("For loop method");
let max = testArray[0];
for (let i = 1; i < testArray.length; i++) {
    if (testArray[i] > max) max = testArray[i];
}
console.timeEnd("For loop method");

console.time("Reduce method");
testArray.reduce((max, current) => current > max ? current : max);
console.timeEnd("Reduce method");

// Method 10: Interactive summary
console.log("\n10. Summary of All Approaches:");
console.log("==============================");

const approaches = [
    "Math.max() with spread operator - Simple and readable",
    "Traditional for loop - Most efficient for large arrays",
    "Array.reduce() - Functional programming approach",
    "Array.sort() - Good when you need sorted results",
    "Custom functions - Best for complex requirements"
];

approaches.forEach((approach, index) => {
    console.log(`${index + 1}. ${approach}`);
});

console.log("\n🎯 Best Practice Recommendation:");
console.log("For simple arrays: Use Math.max(...array)");
console.log("For large arrays: Use traditional for loop");
console.log("For complex objects: Use custom functions with loops");

console.log("\n" + "=".repeat(50));
console.log("🎉 Day 2 Mini Task Completed Successfully!");
console.log("✅ Learned multiple ways to find highest marks");
console.log("✅ Understood performance implications");
console.log("✅ Applied loops and functions practically");
console.log("=".repeat(50));