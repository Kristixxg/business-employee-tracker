-- All employees
SELECT
a.id AS id, a.first_name, a.last_name, role.title, department.name AS department, role.salary, CONCAT(aa.first_name," ", aa.last_name)  AS manager
FROM employee a
LEFT JOIN employee aa on a.manager_id = aa.id 
LEFT JOIN role ON a.role_id = role.id 
JOIN department ON role.department_id = department.id;

-- All departments
SELECT * FROM department;

-- All roles
SELECT 
role.id, role.title, role.salary, department.name AS department
FROM role
LEFT JOIN department ON role.department_id = department.id;

--Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('answer.firstName', 'answer.lastName', 'if (answer.role === "Sales Lead") {return 1'}, NULL),


-- managers and roles table
SELECT
role.title, CONCAT(employee.first_name, " ", employee.last_name) AS name
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- role title only
SELECT role.title FROM role;


--Update
UPDATE employee
SET role_id = ?
WHERE id = ?;