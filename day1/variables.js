// Day 1: JavaScript Variables, Types, and Operators

console.log("=== Day 1: JavaScript Basics ===\n");

// Variables and Types
console.log("1. Variables and Types:");
console.log("=====================");

// Different ways to declare variables
var oldWay = "I'm declared with var";
let modernWay = "I'm declared with let";
const constantValue = "I'm declared with const";

console.log("var:", oldWay);
console.log("let:", modernWay);
console.log("const:", constantValue);

// Data Types
console.log("\n2. Data Types:");
console.log("==============");

// String
let studentName = "John Doe";
console.log("String:", studentName, "- Type:", typeof studentName);

// Number
let age = 21;
let gpa = 3.85;
console.log("Number (integer):", age, "- Type:", typeof age);
console.log("Number (decimal):", gpa, "- Type:", typeof gpa);

// Boolean
let isStudent = true;
let isGraduated = false;
console.log("Boolean (true):", isStudent, "- Type:", typeof isStudent);
console.log("Boolean (false):", isGraduated, "- Type:", typeof isGraduated);

// Undefined
let undefinedVariable;
console.log("Undefined:", undefinedVariable, "- Type:", typeof undefinedVariable);

// Null
let nullVariable = null;
console.log("Null:", nullVariable, "- Type:", typeof nullVariable);

// Array
let subjects = ["Math", "Science", "English"];
console.log("Array:", subjects, "- Type:", typeof subjects);

// Object
let student = {
    name: "Jane Smith",
    age: 20,
    course: "Computer Science"
};
console.log("Object:", student, "- Type:", typeof student);

// Operators
console.log("\n3. Operators:");
console.log("=============");

// Arithmetic Operators
let a = 10;
let b = 3;

console.log("Arithmetic Operators:");
console.log(`${a} + ${b} = ${a + b}`);
console.log(`${a} - ${b} = ${a - b}`);
console.log(`${a} * ${b} = ${a * b}`);
console.log(`${a} / ${b} = ${a / b}`);
console.log(`${a} % ${b} = ${a % b}`);
console.log(`${a} ** ${b} = ${a ** b}`);

// Comparison Operators
console.log("\nComparison Operators:");
console.log(`${a} > ${b}: ${a > b}`);
console.log(`${a} < ${b}: ${a < b}`);
console.log(`${a} >= ${b}: ${a >= b}`);
console.log(`${a} <= ${b}: ${a <= b}`);
console.log(`${a} == ${b}: ${a == b}`);
console.log(`${a} === ${b}: ${a === b}`);
console.log(`${a} != ${b}: ${a != b}`);
console.log(`${a} !== ${b}: ${a !== b}`);

// Logical Operators
console.log("\nLogical Operators:");
let x = true;
let y = false;
console.log(`${x} && ${y}: ${x && y}`);
console.log(`${x} || ${y}: ${x || y}`);
console.log(`!${x}: ${!x}`);

// Assignment Operators
console.log("\nAssignment Operators:");
let c = 5;
console.log("Initial value of c:", c);
c += 3; // c = c + 3
console.log("After c += 3:", c);
c -= 2; // c = c - 2
console.log("After c -= 2:", c);
c *= 2; // c = c * 2
console.log("After c *= 2:", c);
c /= 4; // c = c / 4
console.log("After c /= 4:", c);

console.log("\n=== End of Variables, Types, and Operators ===");