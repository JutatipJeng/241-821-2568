// ตัวแปรปกติ
let age1 = 25;
let age2 = 30;
let age3 = 35;

// Array
let ages = [25, 30, 35];
console.log(ages);
console.log(ages[1]);

ages = [40, 45, 50];
console.log(ages);

ages.push(55);
console.log(ages);

// ความยาวของอาเรย์
console.log(ages.length);

// ลบสมาชิกตัวท้าย
ages.pop();
console.log(ages); // [40,45,50]

// ตรวจสอบค่าในอาเรย์
if (ages.includes(45)) {
    console.log("พบ 45 ในอาเรย์");
}

// เรียงตัวเลข
let numbers = [90, 60, 80, 40, 50];
numbers.sort((a, b) => a - b);
console.log(numbers); // [40,50,60,80,90]

// Array ของชื่อ
let names = ["john", "jane", "doe"];
names.push("Smith");
console.log(names);
console.log(names.length);

// loop แสดงชื่อ
for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

// =====================
// Array of Objects
// =====================
let students = [
    {
        age: 20,
        name: "Emma",
        grade: "A"
    },
    {
        age: 22,
        name: "Lian",
        grade: "B"
    }
];

// ลบตัวท้าย
students.pop();

// แสดงข้อมูลนักเรียน
for (let i = 0; i < students.length; i++) {
    console.log("student " + (i + 1));
    console.log("name:", students[i].name);
    console.log("age:", students[i].age);
    console.log("grade:", students[i].grade);
}

// =====================
// Function
// =====================
function calculateGrade(score) {
    let grade;
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';
    return grade;
}

let studentScore = 85;
let studentGrade = calculateGrade(studentScore);
console.log("student's grade is:", studentGrade);

// =====================
// Array loop / map / forEach
// =====================
let scores = [10, 20, 30, 40, 50];

for (let i = 0; i < scores.length; i++) {
    console.log(`score at index ${i} is ${scores[i]}`);
}

scores = scores.map(s => s * 2);

scores.forEach(s => {
    console.log('new score:', s);
});

// =====================
// filter
// =====================
let newScore = scores.filter(s => s >= 30);

newScore.forEach(ns => {
    console.log('filtered score:', ns);
});

// =====================
// find / map / filter กับ object
// =====================
let studentList = [
    {
        name: 'aa',
        score: 50,
        grade: 'A'
    },
    {
        name: 'bb',
        score: 60,
        grade: 'B'
    }
];

console.log('student:', studentList[0]);

let foundStudent = studentList.find(s => s.name === 'bb');
console.log('found student:', foundStudent);

let doubleScoreStudent = studentList.map(s => {
    return {
        ...s,
        score: s.score * 2
    };
});

console.log('double score:', doubleScoreStudent);

let highScoreStudent = doubleScoreStudent.filter(s => s.score >= 110);
console.log('high score student:', highScoreStudent);
