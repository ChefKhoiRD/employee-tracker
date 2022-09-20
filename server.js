// NPM Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Initalize app
const startApp = () => {
    startUserPrompts()
};

startApp();

// Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passowrd: 'password',
    database: 'employee_db'
});

// User prompt questions
const userPromptQuestions = {
    type: 'list',
    name: 'userQuestions',
    message: 'Please select an option from the list',
    choices: [
        "View all departments",
        "Add a department",
        "View all roles",
        "Add a role",
        "View all employees",
        "Add an employee",
        "Update an employee",
        "Exit"
    ]
}

// User prompt
const startUserPrompts = async () => {

    await inquirer.prompt(userPromptQuestions)

    .then(answer => {
        // NOTE! - answer.userQuestions might be the wrong place to get answers
        switch(answer.userQuestions) {
            case "View all departments":
                showDepartment()
                break

            case "Add a department":
                addDepartment()
                break

            case "View all roles":
                showRoles()
                break

            case "Add a role":
                addRole()
                break

            case "View all employees":
                showEmployees()
                break

            case "Add an employee":
                addEmployee()
                break

            case "Update an employee":
                updateEmployee()
                break

            case "Exit":
                connection.end()
                break
        }
    })

    .catch((err) => console.log(err))

};
    
// View department function
const showDepartment = () => {

    let seeDepartmentDb = 'SELECT * FROM department'

    connection.query(seeDepartmentDb, (err, data) => {
        if (err) throw err;

        console.log('/n')
        console.table(results)
    })
};

// Add department function
const addDepartment = () => {

};

// View roles function
const showRoles = () => {

};

// Add roles function
const addRole = () => {

};

// View employees function
const showEmployees = () => {

};

// Add employees function
const addEmployee = () => {

};

// Update employees function
const updateEmployee = () => {

};