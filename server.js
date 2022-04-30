const inquirer = require("inquirer");
require("console.table");
const db = require("./db");

//view all departments, view all roles,
 //view all employees, add a department,
 // add a role, add an employee, and update an employee role

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please choose an option:",
        choices: [
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ]
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case "View All Employees":
          return allEmployees();
        case "Add Department":
          return addDepartment();
        case "Add Role":
          return addRoles();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
        return updateEmployee();
        default:
          return quit();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.error('could not log')
      } else {
        console.log('logged successfully')
      }
    });
}

init();

async function allEmployees() {
    const employees = await db.findAllEmployees();
    console.table(employees);
    init();
  }
  


  async function addDepartment() {
    const newDep = await db.newDep();
    console.table();

    
    init();
  }