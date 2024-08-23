/** TODO when everything is done, this test can test your employee endpoints. It will probably not compile due to naming. Fix as needed
package no.acntech.project101.web.employee.resources;

import no.acntech.project101.Project101Application;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.TestUtil;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

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
        final var acme = companyService.save(new Company("ACME", "123456789"));
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(acme);
        final var tor = new Employee("Tor", "Divel", LocalDate.of(1994, 10, 1));
        tor.setCompany(acme);

        employeeService.save(ken);
        employeeService.save(tor);

        var response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees"),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                EmployeeDto[].class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        var employees = Arrays.asList(response.getBody());

        assertThat(employees)
                .isNotEmpty()
                .extracting(EmployeeDto::firstName, EmployeeDto::lastName, EmployeeDto::dateOfBirth)
                .contains(
                        Tuple.tuple(ken.getFirstName(), ken.getLastName(), ken.getDateOfBirth()),
                        Tuple.tuple(tor.getFirstName(), tor.getLastName(), tor.getDateOfBirth())
                );
    }

    @Test
    void findById() {
        final var acme = companyService.save(new Company("ACME", "123456789"));

        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(acme);
        final var savedKen = employeeService.save(ken);


        var response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/" + savedKen.getId()),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                EmployeeDto.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        var employeeDto = response.getBody();


        assertThat(employeeDto.dateOfBirth()).isEqualTo(ken.getDateOfBirth());
        assertThat(employeeDto.firstName()).isEqualTo(ken.getFirstName());
        assertThat(employeeDto.lastName()).isEqualTo(ken.getLastName());
    }

    @Test
    void createEmployee() {
        final var acme = companyService.save(new Company("ACME", "123456789"));

        final var kenDto = new EmployeeDto(null, "Ken", "Guru", LocalDate.of(1994, 10, 1), acme.getId());

        var entity = new HttpEntity<>(kenDto, new HttpHeaders());

        var response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees"),
                HttpMethod.POST,
                entity,
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getHeaders().get(HttpHeaders.LOCATION).get(0)).containsPattern("\\/employees\\/\\d+");
    }

    @Test
    void deleteEmployee() {
        final var acme = companyService.save(new Company("ACME", "123456789"));
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(acme);
        final var savedKen = employeeService.save(ken);

        var response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/" + savedKen.getId()),
                HttpMethod.DELETE,
                new HttpEntity<>(null, new HttpHeaders()),
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}
**/