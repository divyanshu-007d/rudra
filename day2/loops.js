// Day 2: Loops (for, while, forEach)

console.log("=== Day 2: Loops ===\n");

// Sample data for demonstrations
const students = ["Alice", "Bob", "Charlie", "Diana", "Eva"];
const marks = [85, 92, 78, 88, 95];
const subjects = {
    javascript: 90,
    nodejs: 85,
    react: 88,
    express: 82
};

// 1. Traditional For Loop
console.log("1. Traditional For Loop:");
console.log("========================");

console.log("Counting from 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

console.log("\nPrinting student names with index:");
for (let i = 0; i < students.length; i++) {
    console.log(`${i + 1}. ${students[i]}`);
}

console.log("\nCalculating squares of numbers 1-5:");
for (let i = 1; i <= 5; i++) {
    console.log(`${i}² = ${i * i}`);
}

// 2. For...of Loop (for arrays and iterables)
console.log("\n2. For...of Loop:");
console.log("==================");

console.log("Student names using for...of:");
for (const student of students) {
    console.log(`Student: ${student}`);
}

console.log("\nMarks using for...of:");
for (const mark of marks) {
    console.log(`Mark: ${mark}%`);
}

// Using for...of with index
console.log("\nStudents with their marks:");
for (const [index, student] of students.entries()) {
    console.log(`${student}: ${marks[index]}%`);
}

// 3. For...in Loop (for objects and array indices)
console.log("\n3. For...in Loop:");
console.log("==================");

console.log("Subject marks using for...in:");
for (const subject in subjects) {
    console.log(`${subject}: ${subjects[subject]}%`);
}

console.log("\nArray indices using for...in:");
for (const index in students) {
    console.log(`Index ${index}: ${students[index]}`);
}

// 4. While Loop
console.log("\n4. While Loop:");
console.log("==============");

console.log("Countdown from 5:");
let countdown = 5;
while (countdown > 0) {
    console.log(`Countdown: ${countdown}`);
    countdown--;
}
console.log("Blast off! 🚀");

console.log("\nFinding first student with marks > 90:");
let index = 0;
while (index < marks.length) {
    if (marks[index] > 90) {
        console.log(`Found: ${students[index]} with ${marks[index]}%`);
        break;
    }
    index++;
}

// 5. Do-While Loop
console.log("\n5. Do-While Loop:");
console.log("==================");

console.log("Number guessing simulation:");
let guess = 1;
const target = 3;
do {
    console.log(`Guessing: ${guess}`);
    if (guess === target) {
        console.log("Correct guess! 🎉");
        break;
    }
    guess++;
} while (guess <= 5);

// 6. Array forEach Method
console.log("\n6. Array forEach Method:");
console.log("========================");

console.log("Students with forEach:");
students.forEach((student, index) => {
    console.log(`${index + 1}. ${student}`);
});

console.log("\nMarks analysis with forEach:");
marks.forEach((mark, index) => {
    const grade = mark >= 90 ? "A" : mark >= 80 ? "B" : mark >= 70 ? "C" : "D";
    console.log(`${students[index]}: ${mark}% (Grade: ${grade})`);
});

// 7. Nested Loops
console.log("\n7. Nested Loops:");
console.log("================");

console.log("Multiplication table for 2 and 3:");
for (let i = 2; i <= 3; i++) {
    console.log(`\nTable of ${i}:`);
    for (let j = 1; j <= 5; j++) {
        console.log(`${i} × ${j} = ${i * j}`);
    }
}

console.log("\nMatrix pattern:");
for (let row = 1; row <= 3; row++) {
    let line = "";
    for (let col = 1; col <= 4; col++) {
        line += `[${row},${col}] `;
    }
    console.log(line);
}

// 8. Loop Control Statements
console.log("\n8. Loop Control Statements:");
console.log("===========================");

console.log("Using 'continue' to skip even numbers:");
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // Skip even numbers
    }
    console.log(`Odd number: ${i}`);
}

console.log("\nUsing 'break' to stop at first high mark:");
for (const [index, mark] of marks.entries()) {
    if (mark > 90) {
        console.log(`Stopping at ${students[index]} with ${mark}%`);
        break;
    }
    console.log(`Checking ${students[index]}: ${mark}%`);
}

// 9. Performance Comparison
console.log("\n9. Performance Example:");
console.log("=======================");

const largeArray = Array.from({length: 1000}, (_, i) => i + 1);

console.time("For Loop Performance");
let sum1 = 0;
for (let i = 0; i < largeArray.length; i++) {
    sum1 += largeArray[i];
}
console.timeEnd("For Loop Performance");
console.log(`Sum using for loop: ${sum1}`);

console.time("ForEach Performance");
let sum2 = 0;
largeArray.forEach(num => {
    sum2 += num;
});
console.timeEnd("ForEach Performance");
console.log(`Sum using forEach: ${sum2}`);

// 10. Practical Examples
console.log("\n10. Practical Loop Examples:");
console.log("============================");

// Find all students with marks above average
const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
console.log(`Class average: ${average.toFixed(1)}%`);

console.log("Students above average:");
for (let i = 0; i < students.length; i++) {
    if (marks[i] > average) {
        console.log(`✅ ${students[i]}: ${marks[i]}% (${(marks[i] - average).toFixed(1)} above avg)`);
    }
}

// Create a grade distribution
const gradeDistribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
marks.forEach(mark => {
    if (mark >= 90) gradeDistribution.A++;
    else if (mark >= 80) gradeDistribution.B++;
    else if (mark >= 70) gradeDistribution.C++;
    else if (mark >= 60) gradeDistribution.D++;
    else gradeDistribution.F++;
});

console.log("\nGrade Distribution:");
for (const grade in gradeDistribution) {
    console.log(`Grade ${grade}: ${gradeDistribution[grade]} students`);
}

console.log("\n=== End of Loops ===");