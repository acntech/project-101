package no.acntech.project101.web.employee.resources;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import no.acntech.project101.employee.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("employees")
public class EmployeeResource {

    private ArrayList<EmployeeDto> employees;

    //TODO The constructor needs to accept the required dependencies and assign them to class variables
    public EmployeeResource() {
        this.employees = new ArrayList<>();

        IntStream.range(0, 100).forEach(i -> this.employees.add(
                new EmployeeDto((long) i, "Adrian", "Melsom", LocalDate.of(1993, 7, 13), 1l)
        ));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> findAll() {
        return ResponseEntity.ok(this.employees);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> findById(@PathVariable final int id) {
        return ResponseEntity.ok(this.employees.get(id));
    }

    @PostMapping
    public ResponseEntity createEmployee(@RequestBody final EmployeeDto employeeDto) {
        ResponseEntity response = new ResponseEntity(HttpStatus.BAD_REQUEST);

        if(this.employees.add(employeeDto))
            response = new ResponseEntity(HttpStatus.CREATED);


        return response;
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteEmployee(@PathVariable final int id) {

        ResponseEntity response = new ResponseEntity(HttpStatus.BAD_REQUEST);

        if(this.employees.removeIf(e -> e.getId() == id))
            response = new ResponseEntity(HttpStatus.ACCEPTED);

        return response;
    }

    @PatchMapping("{id}")
    public ResponseEntity updateEmployee(@PathVariable final int id, @RequestBody final EmployeeDto employeeDto) {

        ResponseEntity response = new ResponseEntity(HttpStatus.BAD_REQUEST);


        System.out.println(id);
        System.out.println(employeeDto.getId());
        if(this.employees.removeIf(e -> id == employeeDto.getId())) {
            this.employees.add(employeeDto);
            response = ResponseEntity.ok("Employee updated");
        }

        return response;
    }
}
