const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }




    findAllEmployees(){
        return this.connection.query(
            "SELECT * FROM employee;"
        )
    }

    newDep(){
        let departments = this.connection.query(
            "DESCRIBE department"
        )

        
    }

}

module.exports = new DB(connection);



