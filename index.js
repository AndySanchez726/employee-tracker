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

let departments = [];
let roles = [];
let managers = [];
let employeeList = [];


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
                        console.table(rows);
                        Prompt();
                    })
            }
            else if (selection === options[1]) {
                console.log('View All Employees was selected')
                connection.promise().query('SELECT * FROM employee')
                    .then( ([rows, fields]) => {
                        console.table(rows);
                        Prompt();
                    })            
            } else if (selection === options[2]) {
                console.log('View All Roles was selected')
                connection.promise().query('SELECT * FROM role')
                    .then( ([rows, fields]) => {
                        console.table(rows);
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
                connection.promise().query('SELECT * FROM department')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            departments.push(rows[i].department) 
                        }
                    })
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
                        type: 'list',
                        name: 'department',
                        message: 'What department is this role apart of?',
                        choices: departments
                    }
                    ]).then(({role, salary, department}) => {
                        console.log(role, salary, department)
                        connection.promise().query(
                            'INSERT INTO role SET ?',
                            {
                                title: role,
                                salary: salary,
                                department_name: department
                            }
                        )
                        Prompt();
                    })
            } else if (selection === options[5]) {
                console.log('Add An Employee was selected')
                connection.promise().query('SELECT title FROM role')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            roles.push(rows[i].title) 
                        }
                    })       
                connection.promise().query('SELECT manager_name FROM manager')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            managers.push(rows[i].manager_name) 
                        }
                    })       
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
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the employee's manager?",
                        choices: managers
                    }
                    ]).then(({firstName, lastName, role, manager}) => {
                        console.log(firstName, lastName, role, manager)
                        connection.promise().query(
                            'INSERT INTO employee SET ?',
                            {
                                first_name: firstName,
                                last_name: lastName,
                                role_name: role,
                                manager_name: manager
                            }
                        )
                        Prompt();
                    })
            } else if (selection === options[6]) {
                console.log('Update An Employee Role was selected')
                async function update() {
                     let employeeName = connection.promise().query('SELECT first_name, last_name FROM employee')
                        .then( ([rows]) => {
                            for (let i = 0; i < rows.length; i++) {
                                let first = rows[i].first_name
                                let last = rows[i].last_name
                                employeeList.push(first + ' ' + last) 
                            }
                        })   
                        let employeeRole = connection.promise().query('SELECT title FROM role')
                            .then( ([rows]) => {
                                for (let i = 0; i < rows.length; i++) {
                                    roles.push(rows[i].title) 
                                }
                            })
                        await employeeName, employeeRole

                        return inquirer
                            .prompt([{
                                type: 'list',
                                name: 'employee',
                                message: "Choose an employee to update.",
                                choices: employeeList
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: "What is the employee's new role?",
                                choices: roles
                            }])
                            .then(({employee, role}) => {
                                console.log(employee, role);
                                Prompt();
                            })
                }
                update();
                
                    
            }

        })
        
}


Prompt();