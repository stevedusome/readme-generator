// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js");

const writeFileAsync = util.promisify(fs.writeFile);


// Created an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the name of your project? (Required)",
        validate: titleInput => {
            if (titleInput) {
                return true;
            }
            else {
                console.log("Please enter name of your project");
                return false;
            }}},
    {
        type: "input",
        name: "description",
        message: "Please provide a brief description of your project (Required)",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            }
            else {
                console.log("Please enter a description of your project");
                return false;
            }}},    
    {
        type: "input",
        name: "github",
        message: "What is your GitHub user name? (Required)",
        validate: githubInput => {
            if (githubInput) {
                return true;
            }
            else {
                console.log("Please enter your Github username!");
                return false;
            }}},
    {
        type: "input",
        name: "email",
        message: "What is your email address? (Required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            }
            else {
                console.log("Please enter your email address!");
                return false;
            }}},
    {
        type: "list",
        name: "license",
        message: "What licenses should be included in your project? (Optional)" ,
        choices: ["MIT", "GNU AGPLv3", "Unlicense", "none"],
        default: "none"
    },
    {
        type: "input",
        name: "installation",
        message: "What are the installation guidelines? (Optional)",
        default: "none"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be use to run tests? (Optional)",
        default: "none"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using this repository? (Optional)",
        default: "none"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repository? (Optional)",
        default: "none"
    },
];

const promptUser = () => {
    return inquirer
    .prompt(questions);
};

// Create  a function to write README file
function writeToFile(fileName, data) {
    return writeFileAsync(fileName, data);
}


// Created a function to initialize app
const init = async () => {
    try{
        console.log("Welcome to README generator.\nPlease answer the following questions:")

        // ask for input by users
        const userInput = await promptUser();

        // create readme content from user input
        const fileContent = generateMarkdown(userInput);

        // write content to README.md file
        await writeToFile("./output/README.md", fileContent);

        // notify user that the README file has been created
        console.log("README.me created Check out the read-me folder");
    }
    catch (err) {
        console.log("Error creating README file. Please try again.");
        console.log(err);
    }}

// Function call to initialize app
init();
