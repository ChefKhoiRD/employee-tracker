// NPM Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passowrd: 'password',
    database: 'employee_db'
});

// Initalize app
const startApp = () => {
    startUserPrompts()
};

startApp();


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
        // NOTE! - answer.userQuestions might be the wrong place to get answers, maybe answer.userPromptQuestions
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

            case "Exit":
                connection.end()
                break
        }
    })

    .catch((err) => console.log(err))

};

// Departments functions

    // View department function
    const showDepartment = () => {

        let seeDepartmentDb = 'SELECT * FROM department'

        connection.query(seeDepartmentDb, (err, data) => {
            if (err) throw err;

            console.log('/n')
            console.table(data)
        })
    };

    // Add department function
    const addDepartment = () => {
        return inquirer.prompt([
            {
                name: 'addDepartmentPromptName',
                type: 'input',
                message: "Name of the department:"
            }
        ])

        .then((answers) => {
            connection.query (
                `INSERT INTO department (name) 
                    VALUES (
                        '${answers.addDepartmentPromptName}'
                        )`
            )
        })
    };

// Roles functions

    // View roles function
    const showRoles = () => {

        let seeRolesDb = 'SELECT * FROM roles'

        connection.query(seeRolesDb, (err, data) => {
            if (err) throw err;

            console.log('/n')
            console.table(data)
        })
    };

    // Add roles function
    const addRole = () => {
        return inquirer.prompt([
            {
                name: 'addRolePromptTitle',
                type: 'input',
                message: "Name of the role: "
            },
            {
                name: 'addRolePromptSalary',
                type: 'input',
                message: "Salary of the role: "
            },
            {
                name: 'addRolePromptDepartmentId',
                type: 'input',
                message: "Department ID number: "
            }
        ])
        .then((answers) => {
            connection.query (
                `INSERT INTO role (title, salary, department_id) 
                    VALUES (
                        '${answers.addRolePromptTitle}',
                        '${answers.addRolePromptSalary}',
                        '${answers.addRolePromptDepartmentId}',
                    )`,
            )
        })
    };

// Employees functions

    // View employees function
    const showEmployees = () => {

        let seeEmployeesDb = 'SELECT * FROM employee'

        connection.query(seeEmployeesDb, (err, data) => {
            if (err) throw err;

            console.log('/n')
            console.table(data)
        })
    };

    // Add employees function
    const addEmployee = () => {
        return inquirer.prompt([
            {
                name: 'addEmployeePromptFirstName',
                type: 'input',
                message: "First name of the employee: "
            },
            {
                name: 'addEmployeePromptLastName',
                type: 'input',
                message: "Last name of the employee: "
            },
            {
                name: 'addEmployeePromptRoleID',
                type: 'input',
                message: "Employee's Role ID #: "
            },
            {
                name: 'addEmployeePromptManagerID',
                type: 'list',
                message: "Is employee a Manager?",
                choices: [
                    "Yes",
                    "No"
                ]
            },
            {
                name: 'addEmployeePromptManagerID2',
                type: 'input',
                message: "Employee Manager ID #: ",
                when: (answers) => {
                    if(answers.addDepartmentPromptManagerID === "Yes") {
                        return true
                    }
                }
            },
            
        ])
        .then((answers) => {
            connection.query (
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (
                        '${answers.addDepartmentPromptFirstName}'
                        '${answers.addDepartmentPromptLastName}'
                        '${answers.addDepartmentPromptRoleID}'
                        '${answers.addDepartmentPromptManagerID}'
                    )`,
            )
        })
    };