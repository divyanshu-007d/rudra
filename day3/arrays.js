// Day 3: Arrays & Array Methods

console.log("=== Day 3: Arrays & Array Methods ===\n");

// Sample data
const students = ["Alice", "Bob", "Charlie", "Diana", "Eva"];
const marks = [85, 92, 78, 88, 95];
const subjects = ["Math", "Science", "English", "History"];

console.log("1. Basic Array Operations:");
console.log("=========================");
console.log("Students:", students);
console.log("Marks:", marks);
console.log("Array length:", students.length);
console.log("First student:", students[0]);
console.log("Last student:", students[students.length - 1]);

// Array.map() - Transform each element
console.log("\n2. Array.map() - Transform data:");
console.log("=================================");

const upperCaseNames = students.map(name => name.toUpperCase());
console.log("Uppercase names:", upperCaseNames);

const marksWithBonus = marks.map(mark => mark + 5);
console.log("Marks with 5 bonus:", marksWithBonus);

const studentCards = students.map((name, index) => ({
    id: index + 1,
    name: name,
    score: marks[index]
}));
console.log("Student cards:", studentCards);

// Array.filter() - Filter elements
console.log("\n3. Array.filter() - Filter data:");
console.log("=================================");

const highScorers = marks.filter(mark => mark >= 90);
console.log("High scores (>=90):", highScorers);

const longNames = students.filter(name => name.length > 5);
console.log("Long names (>5 chars):", longNames);

const topStudents = studentCards.filter(student => student.score >= 90);
console.log("Top students:", topStudents);

// Array.reduce() - Reduce to single value
console.log("\n4. Array.reduce() - Aggregate data:");
console.log("====================================");

const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
console.log("Total marks:", totalMarks);

const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
console.log("Average marks:", average.toFixed(1));

const namesList = students.reduce((list, name, index) => {
    return list + (index === 0 ? name : ", " + name);
}, "");
console.log("Names list:", namesList);

// Combined methods
console.log("\n5. Combining Array Methods:");
console.log("===========================");

const passedStudents = studentCards
    .filter(student => student.score >= 80)
    .map(student => student.name)
    .sort();
console.log("Passed students (>=80):", passedStudents);

const gradeDistribution = marks
    .map(mark => mark >= 90 ? "A" : mark >= 80 ? "B" : "C")
    .reduce((dist, grade) => {
        dist[grade] = (dist[grade] || 0) + 1;
        return dist;
    }, {});
console.log("Grade distribution:", gradeDistribution);

// Other useful array methods
console.log("\n6. Other Array Methods:");
console.log("=======================");

console.log("Find first high scorer:", marks.find(mark => mark > 90));
console.log("Index of Diana:", students.indexOf("Diana"));
console.log("Includes Bob:", students.includes("Bob"));
console.log("All passed (>=60):", marks.every(mark => mark >= 60));
console.log("Any failed (<60):", marks.some(mark => mark < 60));

const sortedMarks = [...marks].sort((a, b) => b - a);
console.log("Sorted marks (desc):", sortedMarks);

console.log("\n=== End of Arrays ===");