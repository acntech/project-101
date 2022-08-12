package no.acntech.project101.web.employee.resources;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.employee.resources.converter.EmployeeConverter;
import no.acntech.project101.web.employee.resources.converter.EmployeeDtoConverter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("employees")
public class EmployeeResource {

    private final EmployeeService employeeService;
    private final CompanyService companyService;
    private final EmployeeDtoConverter employeeDtoConverter;
    private final EmployeeConverter employeeConverter;

    public EmployeeResource(final EmployeeService employeeService,
                            final CompanyService companyService,
                            final EmployeeDtoConverter employeeDtoConverter,
                            final EmployeeConverter employeeConverter) {
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.employeeDtoConverter = employeeDtoConverter;
        this.employeeConverter = employeeConverter;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> findAll() {
        final var employees = employeeService.findAll();
        final var collect = employees.stream()
                .map(employeeDtoConverter::convert)
                .collect(Collectors.toList());

        return ResponseEntity.ok(collect);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> findById(@PathVariable final Long id) {
        final var employee = employeeService.findById(id);

        if (employee.isPresent()) {
            final var convert = employeeDtoConverter.convert(employee.get());
            return ResponseEntity.ok(convert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity createEmployee(@RequestBody @Validated final EmployeeDto employeeDto) {
        final var company = companyService.findById(employeeDto.companyId());

        if(company.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        final var employee = employeeConverter.convert(employeeDto);
        employee.setCompany(company.get());
        final var saved = employeeService.save(employee);
        final var uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteEmployee(@PathVariable final Long id) {
        final var employee = employeeService.findById(id);

        if (employee.isPresent()) {
            employeeService.delete(id);
            return ResponseEntity.accepted().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity updateEmployee(@PathVariable final Long id, @RequestBody final EmployeeDto employeeDto) {
        final var optionalEmployee = employeeService.findById(id);
        final var company = companyService.findById(employeeDto.companyId());

        if (optionalEmployee.isPresent() && company.isPresent()) {
            var existingEmployee = optionalEmployee.get();
            existingEmployee.setFirstName(employeeDto.firstName());
            existingEmployee.setLastName(employeeDto.lastName());
            existingEmployee.setDateOfBirth(employeeDto.dateOfBirth());
            existingEmployee.setCompany(company.get());

            var saved = employeeService.save(existingEmployee);

            final var convert = employeeDtoConverter.convert(saved);
            return ResponseEntity.ok(convert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
