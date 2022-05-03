const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
require("console.table");
const util = require('util');
const { process_params } = require("express/lib/router");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

db.query = util.promisify(db.query);


function init() {

    inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please choose an option:",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee Role",
          "Quit",
        ]
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case "View All Employees":
          return allEmployees();
        case "View All Roles":
          return allRoles();
        case "View All Departments":
          return allDepartments();

        case "Add Employee":
          return addEmployee();
        case "Add Role":
          return addRole();
        case "Add Department":
          return addDepartment();
        
        case "Update Employee Role":
        return updateEmployeeRole();
        default:
          return quit();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error('error occurs when selecting option')
      } else {
        console.log('selection entered successfully')
      }
    });
}

//query all employees
function allEmployees() {
  return db.query('SELECT a.id AS id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(aa.first_name," ", aa.last_name)  AS manager FROM employee a LEFT JOIN employee aa on a.manager_id = aa.id LEFT JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id;', function (err, results) {
    console.table(results);
    init();
  });
}

//query all departments
function allDepartments() {
  return db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init();
  });
}

//query all roles
function allRoles() {
  return db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results);
    init();
  });
};

//add role
function addRole(){
  db.query('SELECT * FROM department', function (err, results) {
    let departmentsDict = new Map();
    results.forEach((element) => {
      departmentsDict.set(element.name, element.id);
    })

    console.log(departmentsDict);

    inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role title",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter role salary",
      },
      {
        type: "list",
        name: "department",
        message: "Enter department",
        choices: Array.from(departmentsDict.keys())
      },
    ])
    .then((answer) => {
      console.log("answered");
      let department_id = departmentsDict.get(answer.department);
      console.log(department_id);
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [answer.title, answer.salary,department_id], function(err, results) { 
        init();
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error('could not get input')
      } else {
        console.log('got input')
      }
    })

  });
}

//add employee 
function addEmployee() {
  //pull data from role table and pull from employee table
 

  db.query('SELECT * FROM role;', (err, results)=> {
    // console.log(results);
    let roleChoicesDic = new Map();
    results.forEach((element)=>{
      roleChoicesDic.set(element.title, element.id);
    });
    console.log(roleChoicesDic);


    db.query('SELECT * FROM employee;', (err, results)=> {
      console.log(results);
      let employeeDic = new Map();
      employeeDic.set('None', null);

      results.forEach((element)=>{
        employeeDic.set((element.first_name + " " + element.last_name), element.id);
      });

        inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter employee's first name",
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter employee's last name",
          },
          {
            type: "list",
            name: "role",
            message: "Enter employee's role",
            choices: Array.from(roleChoicesDic.keys())
          },
          {
            type: "list",
            name: "manager",
            message: "Select employee's manager",
            choices: Array.from(employeeDic.keys())
          },
        ])
        .then((answer) => {
          let roleId = roleChoicesDic.get(answer.role);
          let managerId = employeeDic.get(answer.manager);

          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answer.firstName, answer.lastName, roleId, managerId], function (err, results) {
            console.table(results);
            if (err) {
              // Prompt couldn't be rendered in the current environment
              console.error(err);

            } else {
              console.log('added employee successfully')
            }
            init();
          });
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error('could not get input')
          } else {
            console.log('got input')
          }
      });

    });

    });

  };


//add department
function addDepartment() {

  inquirer
  .prompt([ 
  {
    type: "input",
    name: "newDepartment",
    message: "Enter new department"
  },
  ])
  .then((answer)=> {
    db.query('INSERT INTO department (name) VALUES(?)', answer.newDepartment, (err, results)=>{
      if (err) {
        console.err('error adding department')
      } else {
        console.log(results);
      }
      init();
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error('could not get input')
    } else {
      console.log('got input')
    }
  });



};

//update employee role
function updateEmployeeRole() {

  //pull all employee name
 db.query('SELECT * FROM employee;', (err, results) => {
  // console.log(results);
  let employeeDic = new Map();
      results.forEach((element)=>{
        employeeDic.set((element.first_name + " " + element.last_name), element.id);
      });

      // console.log(employeeDic);

      db.query('SELECT * FROM role;', (err, results) => {
        // console.log(results);
        let roleChoicesDic = new Map();
        results.forEach((element)=>{
          roleChoicesDic.set(element.title, element.id);
        });
        // console.log(roleChoicesDic);

        console.log(Array.from(employeeDic.keys()));
        console.log(Array.from(roleChoicesDic.keys()));

        inquirer
        .prompt([
        {
          type: "list",
          name: "emName",
          message: "Select an employee to update",
          choices: Array.from(employeeDic.keys())
        },
        {
          type: "list",
          name: "emNewRole",
          message: "Which role do you want to assign to the selected employee?",
          choices: Array.from(roleChoicesDic.keys())
        }
        ])
        .then((answer)=>{
          let employeeID = employeeDic.get(answer.emName);
          let roleID = roleChoicesDic.get(answer.emNewRole);

          db.query('UPDATE employee SET role_id = ? WHERE id = ?;', [roleID, employeeID], (err, results)=> {
            if (err) {
              console.error('could not update employee role');
              console.error(err);
            } else {
              console.log('updated employee role successfully')
            }
          })

          init();


        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error('could not get input')
          } else {
            console.log('got input')
          }
        });

     
      })

 })
}


function quit() {
 process.exit();
}

init();