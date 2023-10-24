#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
/* Welcome Message */
// <------------------------------------------ Starting ------------------------------------------------>
console.log(chalk.green(`\n************************** ${chalk.yellow("Welcome to My LMS App")} ***************************\n`));
console.log(chalk.green(`*************************** ${chalk.yellow("The Rules are simple")} ***************************\n`));
console.log(chalk.redBright("-> You can enroll a new student."));
console.log(chalk.redBright("-> You can view the balance of a student. You can view balance of all or of a specific student."));
console.log(chalk.redBright("-> You can pay the tuition fees of a student.The tuition fee will be deducted from student's balance."));
console.log(chalk.redBright("-> You can check the status of a student. You can check status of all or of a specific student."));
console.log(chalk.redBright("-> You can exit the app.\n"));
console.log(chalk.green(`******************************** ${chalk.yellow("Good Luck!")} ********************************\n`));
// <------------------------------------------ Ending ------------------------------------------------>
// <--------------------------------------------- Functions ------------------------------------------------>
// First Inquirer to select which action to perform
async function firstInquirer() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ["Enroll New Student", "View Balance", "Pay Tuition Fees", "Show Status", "Exit"],
        },
    ]);
    // Switch case to perform the action
    switch (answers.action) {
        case "Enroll New Student":
            addStudent();
            break;
        case "View Balance":
            viewBalance();
            break;
        case "Pay Tuition Fees":
            payTuitionFees();
            break;
        case "Show Status":
            showStatus();
            break;
        case "Exit":
            console.log(chalk.green("\nThank you for using our LMS App!"));
            process.exit(0);
    }
}
// Function to view balance
async function viewBalance() {
    console.log(chalk.green(`\n******************************* ${chalk.yellow("View Balance")} *******************************\n`));
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Do you want to view balance of all students or a specific student?",
            choices: ["All Students", "Specific Student"],
        },
    ]);
    // For all students
    if (answers.choice === "All Students") {
        console.log(chalk.green(`\n**************************** ${chalk.yellow("All Students")} ****************************\n`));
        if (students.length === 0) {
            console.log(chalk.red(`-> No students enrolled yet!\n`));
        }
        else {
            students.forEach((student) => {
                console.log(chalk.yellow(`-> ${student.name} has a balance of ${student.balance}\n`));
            });
        }
        firstInquirer();
        // For a specific student
    }
    else {
        inquirer
            .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the student ID :",
            },
        ])
            .then((answers) => {
            const student = students.find((student) => student.studentId == answers.name);
            if (student) {
                console.log(chalk.yellow(`\n-> ${student.name} has a balance of ${student.balance}\n`));
                firstInquirer();
            }
            else {
                console.log(chalk.red(`\n-> ${answers.name} is not enrolled in our LMS App!\n`));
                firstInquirer();
            }
        });
    }
}
// Function to pay tuition fees
async function payTuitionFees() {
    console.log(chalk.green(`\n******************************* ${chalk.yellow("Pay Tuition Fees")} *******************************\n`));
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the student ID :",
        },
    ]);
    const student = students.find((student) => student.studentId == answers.name);
    if (student) {
        inquirer
            .prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount you want to pay :",
            },
        ])
            .then((answers) => {
            if (answers.amount > student.balance) {
                console.log(chalk.red(`\n-> The Student don't have enough balance to pay the fee.\n`));
            }
            else {
                student.balance -= answers.amount;
                console.log(chalk.yellow(`\n-> ${answers.amount} have been deducted from the students account. The remaining amount is : ${student.balance}\n`));
            }
            firstInquirer();
        });
    }
    else {
        console.log(chalk.red(`\n-> ${answers.name} is not enrolled in our LMS App!\n`));
        firstInquirer();
    }
}
// Function to show status
async function showStatus() {
    console.log(chalk.green(`\n******************************* ${chalk.yellow("Show Status")} *******************************\n`));
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Do you want to view status of all students or a specific student?",
            choices: ["All Students", "Specific Student"],
        },
    ]);
    // For all students
    if (answers.choice === "All Students") {
        console.log(chalk.green(`\n**************************** ${chalk.yellow("All Students")} ****************************\n`));
        if (students.length === 0) {
            console.log(chalk.red(`-> No students enrolled yet!\n`));
        }
        else {
            students.forEach((student) => {
                console.log(chalk.yellow(`Student ID: ${student.studentId}\nName: ${student.name}\nAge: ${student.age}\nBalance: ${student.balance}\nCourses: ${student.course}\n`));
                console.log(chalk.green("-----------------------------------------------------------------------------------\n"));
            });
        }
        firstInquirer();
        // For a specific student
    }
    else {
        inquirer
            .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the student ID :",
            },
        ])
            .then((answers) => {
            const student = students.find((student) => student.studentId == answers.name);
            if (student) {
                console.log(chalk.yellow(`\nStudent ID: ${student.studentId}\nName: ${student.name}\nAge: ${student.age}\nBalance: ${student.balance}\nCourses: ${student.course}\n`));
            }
            else {
                console.log(chalk.red(`\n-> ${answers.name} is not enrolled in our LMS App!\n`));
            }
            firstInquirer();
        });
    }
}
// Generating a using 5-digit number for the student ID
function randomNumber() {
    let studentId = Math.floor(10000 + Math.random() * 90000);
    return studentId;
}
// Array of students
let students = [];
class Students {
    constructor(studentId, name, age, balance, course) {
        this.studentId = studentId;
        this.name = name;
        this.age = age;
        this.balance = balance;
        this.course = course;
    }
    // Function to add student
    addStudent() {
        students.push({
            studentId: randomNumber(),
            name: this.name,
            age: this.age,
            course: this.course,
            balance: this.balance,
        });
    }
}
// Function to add student
const addStudent = () => {
    console.log(chalk.green(`\n**************************** ${chalk.yellow("Enroll New Student")} ****************************\n`));
    const answers = inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name :",
        },
        {
            type: "number",
            name: "age",
            message: "Enter your age :",
        },
        {
            type: "number",
            name: "balance",
            message: "Enter your balance :",
        },
        {
            type: "checkbox",
            name: "course",
            message: "Select your course :",
            choices: [
                "Maths",
                "Physics",
                "Chemistry",
                "Biology",
                "Computer Science",
                "English",
                "Urdu",
                "Islamiat",
            ],
        },
    ]);
    answers.then((answers) => {
        const student = new Students(randomNumber(), answers.name, answers.age, answers.balance, answers.course);
        student.addStudent();
        console.log(chalk.yellow(`\n-> Student added successfully!\n`));
        firstInquirer();
    });
};
firstInquirer();
