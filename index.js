const inquirer = require('inquirer');
// const router = require('express').Router();
// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qe5!05QDxH%V',
  database: 'employee_db'
});

const options = ["View All Departments", "View All Employees", "View All Roles", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role"]
function Prompt() {

    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: options
            }
        )
        .then(({selection}) => {
            if (selection === options[0]) {
                console.log('View All Departments was selected')

                connection.promise().query('SELECT * FROM department')
                    .then( ([rows, fields]) => {
                        console.log(rows);
                        Prompt();
                    })
            }
            else if (selection === options[1]) {
                console.log('View All Employees was selected')
                connection.promise().query('SELECT * FROM employee')
                    .then( ([rows, fields]) => {
                        console.log(rows);
                        Prompt();
                    })            
            } else if (selection === options[2]) {
                console.log('View All Roles was selected')
                connection.promise().query('SELECT * FROM role')
                    .then( ([rows, fields]) => {
                        console.log(rows);
                        Prompt();
                    })            
            } else if (selection === options[3]) {
                console.log('Add A Department was selected')
                return inquirer
                    .prompt({
                        type: 'text',
                        name: 'department',
                        message: 'What is the name of the department?'
                    }).then(({department}) => {
                        console.log(department)
                        connection.promise().query(
                            'INSERT INTO department SET ?',
                            {
                                department: department
                            }
                        )
                        Prompt();
                    })
            } else if (selection === options[4]) {
                console.log('Add A Role was selected')
                return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'role',
                        message: 'What is the role?'
                    },
                    {
                        type: 'text',
                        name: 'salary',
                        message: 'What is the salary for this role?'
                    },
                    {
                        type: 'text',
                        name: 'department',
                        message: 'What department is this role apart of?'
                    }
                    ]).then(({role, salary, department}) => {
                        console.log(role, salary, department)
                        Prompt();
                    })
            } else if (selection === options[5]) {
                console.log('Add An Employee was selected')
                return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'firstName',
                        message: "What is the employee's first name?"
                    },
                    {
                        type: 'text',
                        name: 'lastName',
                        message: "What is the employee's last name?"
                    },
                    {
                        type: 'text',
                        name: 'role',
                        message: "What is the employee's role?"
                    },
                    {
                        text: 'text',
                        name: 'manager',
                        message: "Who is the employee's manager?"
                    }
                    ]).then(({firstName, lastName, role, manager}) => {
                        console.log(firstName, lastName, role, manager)
                        Prompt();
                    })
            } else if (selection === options[6]) {
                console.log('Update An Employee Role was selected')
                return inquirer
                .prompt([{
                    type: 'list',
                    name: 'employee',
                    message: "Choose an employee to update.",
                    choices: /* employee list from database*/['Employee 1', 'Employee 2']
                },
                {
                    type: 'text',
                    name: 'role',
                    message: "What is the employee's new role?"
                }]).then(({employee, role}) => {
                    console.log(employee, role);
                    Prompt();
                })
            }

        })
        
}

Prompt();