USE employees_db;

INSERT INTO department (name)
VALUES  ('Sales'),
        ('Accounting'),
        ('Engineering'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 3),
        ('Software Engineer', 120000, 3),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Valerie', 'Hernandez', 1, NULL),
        ('John', 'Snow', 2, 1),
        ('Faran', 'Navazi', 3, NULL),
        ('Kristy', 'Guo', 4, 3),
        ('Maryjane', 'Archuleta', 5, NULL),
        ('Jake', 'Jones', 6, 5),
        ('Laura', 'Hernandez', 7, NULL),
        ('Alice', 'Moreno', 8, 7);
