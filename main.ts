#! /usr/bin/env node

import inquirer from "inquirer"
console.log("\n ---- Welcome To Our Mini Student Management System ---- \n");

const randomNumber: number = Math.floor(10000 + Math.random() * 90000)

let myBalance: number = 50000;

let answer = await inquirer.prompt(
    [
        {
            name: "students",
            type: "input",
            message: "Enter Student Name:",
            validate: function (value: string) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please Enter A Non-Empty Value.";
            },
        },
        {
            name: "courses",
            type: "list",
            message: "Select The Course To Enrolled",
            choices: ["MS.Office", "HTML", "Javascript", "Typescript", "Python"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
    "MS.Office": 1500,
    "HTML": 2000,
    "Javascript": 4000,
    "Typescript": 5000,
    "Python": 9000
};

console.log(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt ([
    {
        name: "payment",
        type: "list",
        message: "Select Payment Method",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name:"amount",
        type:"input",
        message:"Transfer Money:",
        validate: function (value: string) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please Enter A Non-Empty Value.";
        },
    }
]);

console.log(`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount) {
    console.log(`Congratulations, You Have Successfully Enrolled In ${answer.courses}.\n`);
    
let ans = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: "What Would You Like To Do Next?",
        choices: ["View Status","Exit"]
    }
])

if (ans.select === "View Status"){
    console.log("\n********Status********\n");
    console.log(`Student Name: ${answer.students}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.courses}`);
    console.log(`Tution Fees Paid: ${paymentAmount}`);
    console.log(`Balance: ${myBalance -= paymentAmount}`);
} else {
    console.log("\nExiting Student Management System\n");  
}

} else {
    console.log("Invalid Amount Due To Course");
}

console.log("\n ---- Thanks For Testing Our Project ---- \n");
