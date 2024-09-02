package no.acntech.project101.employee.repository;

import org.junit.jupiter.api.Test;

import no.acntech.project101.employee.Employee;

//@DataJpaTest
//@Import({EmployeeDatabaseConfig.class, CompanyDatabaseConfig.class})
//@ContextConfiguration(classes = EmployeeRepository.class)
public class EmployeeRepositoryTest {

    //    @Autowired
    //    private EmployeeRepository repository;

    @Test
    void save() {
        final var employee = new Employee();
        //        final var savedEmployee = repository.save(employee);
        //        assertThat(savedEmployee.getId()).isNotNull();
        //        assertThat(savedEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        //        assertThat(savedEmployee.getLastName()).isEqualTo(employee.getLastName());
        //        assertThat(savedEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }
}
