# Business Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This command-line application allows developers to use Node.js, Inquirer and MySQL to view and interact with employee information stored in the database. User is able to view and manage the departments, roles, and employees in the company.


## Installation
You’ll need to use the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line, and the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.
Enter the below command to install dependencies for the application:
```
npm install
```

## Usage

The application will be invoked by using the following command:
```
node server.js
```



## Code Snippets 

- updating employee's role in the database

<img src="assets/Screen%20Shot%202022-05-02%20at%206.19.09%20PM.png" width="700">

- prompt manager choices to assign to the selected employee

<img src="assets/Screen%20Shot%202022-05-02%20at%206.19.32%20PM.png" width="700">

## Mock-Up

The following video shows an example of the application being used from the command line:

Link to the videos: https://drive.google.com/drive/folders/1R8QV3O6Cu9NkVgZjzdikbyav59mRv3d9?usp=sharing

- View all employees, roles and departments

<img src="assets/Views.gif" width="900">

- Add employee

<img src="assets/Add%20employee.gif" width="900">

- Add role

<img src="assets/Add%20role.gif" width="900">

- Add department

<img src="assets/Add%20department.gif" width="900">

- Update employee role

<img src="assets/Update%20employee.gif" width="900">

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Kristy Guo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.