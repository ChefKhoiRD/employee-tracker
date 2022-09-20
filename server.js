// NPM Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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

            console.table(data)

            startUserPrompts();
        })
    };

    // Add department function
    const addDepartment = () => {
        inquirer.prompt([
            {
                name: 'addDepartmentPromptName',
                type: 'input',
                message: "Name of the department:"
            }
        ])

        .then((departmentAnswers) => {
            connection.query (
                `INSERT INTO department (name) 
                    VALUES 
                    ('${departmentAnswers.addDepartmentPromptName}');`
            )

            console.log(`Added '${departmentAnswers.addDepartmentPromptName}' to the database`)

            startUserPrompts();

        })
    };

// Roles functions

    // View roles function
    const showRoles = () => {

        let seeRolesDb = 'SELECT * FROM roles'

        connection.query(seeRolesDb, (err, data) => {
            if (err) throw err;

            console.table(data)

            startUserPrompts();
        })
    };

    // Add roles function
    const addRole = () => {
        inquirer.prompt([
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

        .then((rolesAnswers) => {
            connection.query (
                `INSERT INTO roles 
                ( title, salary, department_id )
                VALUES 
                ('${rolesAnswers.addRolePromptTitle}', '${rolesAnswers.addRolePromptSalary}', '${rolesAnswers.addRolePromptDepartmentId}');`,
            )

            console.log(`Added 
            '${rolesAnswers.addRolePromptTitle}', 
            '${rolesAnswers.addRolePromptSalary}',
            '${rolesAnswers.addRolePromptDepartmentId}'
            to the database`)

            startUserPrompts();

        })
    };

// Employees functions

    // View employees function
    const showEmployees = () => {

        let seeEmployeesDb = 'SELECT * FROM employee'

        connection.query(seeEmployeesDb, (err, data) => {
            if (err) throw err;

            console.table(data)

            startUserPrompts();

        })
    };

    // Add employees function
    const addEmployee = () => {
        inquirer.prompt([
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
            }
        ])

        .then((employeeAnswers) => {
            connection.query (
                `INSERT INTO employee 
                    ( first_name, last_name, role_id )

                VALUES 
                    ('${employeeAnswers.addEmployeePromptFirstName}', '${employeeAnswers.addEmployeePromptLastName}', '${employeeAnswers.addEmployeePromptRoleID}');`,
            )

            console.log(`Added 
            '${employeeAnswers.addEmployeePromptFirstName}',
            '${employeeAnswers.addEmployeePromptLastName}',
            '${employeeAnswers.addEmployeePromptRoleID}'
             to the database`)
        
            startUserPrompts();

        })

    };
    
// Initalize app
const startApp = () => {
    startUserPrompts()
};

startApp();