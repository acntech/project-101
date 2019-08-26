package no.acntech.project101.web.employee.resources;

import no.acntech.project101.Project101Application;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.TestUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmployeeResourceIT {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CompanyService companyService;


    @Test
    void findAll() {
        //TODO: implement
    }

    @Test
    void findById() {
        final Company acme = companyService.save(new Company("ACME", "123456789"));

        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(acme);
        final Employee savedKen = employeeService.save(ken);


        ResponseEntity<EmployeeDto> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/" + savedKen.getId()),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                EmployeeDto.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        EmployeeDto employeeDto = response.getBody();


        assertThat(employeeDto.getDateOfBirth()).isEqualTo(ken.getDateOfBirth());
        assertThat(employeeDto.getFirstName()).isEqualTo(ken.getFirstName());
        assertThat(employeeDto.getLastName()).isEqualTo(ken.getLastName());
    }

    @Test
    void createEmployee() {
        //TODO: implement
    }

    @Test
    void deleteEmployee() {
        final Company acme = companyService.save(new Company("ACME", "123456789"));
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(acme);
        final Employee savedKen = employeeService.save(ken);

        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/" + savedKen.getId()),
                HttpMethod.DELETE,
                new HttpEntity<>(null, new HttpHeaders()),
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}
