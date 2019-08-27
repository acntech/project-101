package no.acntech.project101.employee.repository;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("employees")
public class EmployeeResource {

    @GetMapping
    public ResponseEntity getEmployee() {
        return ResponseEntity.ok("Adrian123");
    }
}
