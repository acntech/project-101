package no.acntech.project101.web.employee.resources;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
//TODO This is a REST controler and should receive request on path employees
public class EmployeeResource {

    //TODO The constructor needs to accept the required dependencies and assign them to class variables
    public EmployeeResource() {
    }

    public ResponseEntity<List<EmployeeDto>> findAll() {
        //TODO create a GET endpoint find all employees in the database and return them
        return null;
    }

    public ResponseEntity<EmployeeDto> findById() {
        // TODO create a GET endpoint that fetches a spesific employee based on its ID
        return null;
    }

    public ResponseEntity createEmployee() {
        //TODO Create a POST endpoint that accepts an employeeDTO and saves it in the database

        return null;
    }

    public ResponseEntity deleteEmployee() {
        // TODO Create a DELETE endpoint that deletes a specific employee
        return null;
    }

    public ResponseEntity updateEmployee() {
        //TODO Create a PATCH endpoint that updates an employee with new values
        return null;
    }
}
