package no.acntech.project101.web.employee.resources;

import no.acntech.project101.Project101Application;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.TestUtil;
import no.acntech.project101.web.company.resources.CompanyDto;
import no.acntech.project101.web.company.resources.converter.CompanyConverter;
import no.acntech.project101.web.employee.resources.converter.EmployeeConverter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmployeeResourceIT {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @SpyBean
    private EmployeeService employeeService;

    @SpyBean
    private CompanyService companyService;

    @Test
    void findAll() {
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final Employee tor = new Employee("Tor", "Divel", LocalDate.of(1994, 10, 1));
        CompanyDto companyDto = new CompanyDto(1L, "ACME", "123456789");
        ken.setCompany(new CompanyConverter().convert(companyDto));
        tor.setCompany(new CompanyConverter().convert(companyDto));
        doReturn(Arrays.asList(ken, tor)).when(employeeService).findAll();

        ResponseEntity<EmployeeDto[]> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees"),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                EmployeeDto[].class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<EmployeeDto> employees = Arrays.asList(response.getBody());
        assertThat(employees).hasSize(2);
    }

    @Test
    void findById() {
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final CompanyDto companyDto = new CompanyDto(1L, "ACME", "123456789");

        doReturn(Optional.of(ken)).when(employeeService).findById(1L);
        ken.setCompany(new CompanyConverter().convert(companyDto));

        ResponseEntity<EmployeeDto> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/1"),
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
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final EmployeeDto kenDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final CompanyDto companyDto = new CompanyDto(1L, "ACME", "123456789");
        final Company company = new CompanyConverter().convert(companyDto);

        doReturn(ken).when(employeeService).save(ken);
        doReturn(Optional.of(company)).when(companyService).findById(anyLong());

        HttpEntity<EmployeeDto> entity = new HttpEntity<>(kenDto, new HttpHeaders());
        companyService.save(company);

        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/"),
                HttpMethod.POST,
                entity,
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getHeaders().get(HttpHeaders.LOCATION).get(0)).contains("/employees/1");
    }

    @Test
    void deleteEmployee() {
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        doReturn(Optional.of(ken)).when(employeeService).findById(anyLong());

        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/employees/1"),
                HttpMethod.DELETE,
                new HttpEntity<>(null, new HttpHeaders()),
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}