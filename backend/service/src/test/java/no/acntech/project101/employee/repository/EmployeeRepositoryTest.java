package no.acntech.project101.employee.repository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import no.acntech.project101.company.config.CompanyDatabaseConfig;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.config.EmployeeDatabaseConfig;

//@DataJpaTest
//@Import({EmployeeDatabaseConfig.class, CompanyDatabaseConfig.class})
//@ContextConfiguration(classes = EmployeeRepository.class)
public class EmployeeRepositoryTest {

    //    @Autowired
    //    private EmployeeRepository repository;

    @Test
    void save() {
        final Employee employee = new Employee();
        //        final Employee savedEmployee = repository.save(employee);
        //        assertThat(savedEmployee.getId()).isNotNull();
        //        assertThat(savedEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        //        assertThat(savedEmployee.getLastName()).isEqualTo(employee.getLastName());
        //        assertThat(savedEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }
}
