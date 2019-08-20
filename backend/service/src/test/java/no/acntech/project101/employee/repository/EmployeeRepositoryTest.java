package no.acntech.project101.employee.repository;

import no.acntech.project101.company.config.CompanyDatabaseConfig;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.config.EmployeeDatabaseConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnableAutoConfiguration
@ExtendWith(SpringExtension.class)
@Import({EmployeeDatabaseConfig.class, CompanyDatabaseConfig.class})
@ImportAutoConfiguration(FlywayAutoConfiguration.class)
@ContextConfiguration(classes = EmployeeRepository.class)
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void save() {
        final Employee employee = new Employee("Ken", "Guru", LocalDate.of(1982, 1, 1));
        final Employee savedEmployee = repository.save(employee);
        assertThat(savedEmployee.getId()).isNotNull();
        assertThat(savedEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        assertThat(savedEmployee.getLastName()).isEqualTo(employee.getLastName());
        assertThat(savedEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }
}