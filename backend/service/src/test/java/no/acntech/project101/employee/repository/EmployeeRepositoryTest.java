package no.acntech.project101.employee.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import no.acntech.project101.company.config.CompanyDatabaseConfig;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.config.EmployeeDatabaseConfig;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The purpose of these tests is only to show an example on syntax!
 *
 * These tests are not really testing anything other than that the test framework is behaving as expected, as there is
 * no actual functionality being tested.
 */
@DataJpaTest
@Import({EmployeeDatabaseConfig.class, CompanyDatabaseConfig.class})
@ContextConfiguration(classes = EmployeeRepository.class)
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void save() {
        final Employee employee = new Employee();
                final Employee savedEmployee = repository.save(employee);
                assertThat(savedEmployee.getId()).isNotNull();
                assertThat(savedEmployee.getFirstName()).isEqualTo(employee.getFirstName());
                assertThat(savedEmployee.getLastName()).isEqualTo(employee.getLastName());
                assertThat(savedEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }
}