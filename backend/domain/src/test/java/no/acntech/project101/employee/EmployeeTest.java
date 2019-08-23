package no.acntech.project101.employee;

import no.acntech.project101.company.Company;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class EmployeeTest {

    private static final String FIRSTNAME = "Ken";
    private static final String LASTNAME = "Guru";
    private static final LocalDate DATE_OF_BIRTH = LocalDate.of(2000, 1, 1);

    @Test
    void setFirstName() {
        Employee employee = new Employee();
        employee.setFirstName(FIRSTNAME);

        assertThat(employee.getFirstName()).isEqualTo(FIRSTNAME);
    }

    @Test
    void setLastName() {
        Employee employee = new Employee();
        employee.setLastName(LASTNAME);

        assertThat(employee.getLastName()).isEqualTo(LASTNAME);
    }

    @Test
    void setDateOfBirth() {
        Employee employee = new Employee();
        employee.setDateOfBirth(DATE_OF_BIRTH);

        assertThat(employee.getDateOfBirth()).isEqualTo(DATE_OF_BIRTH);
    }

    @Test
    void setCompany() {
        Employee employee = new Employee(FIRSTNAME, LASTNAME, DATE_OF_BIRTH);
        Company company = getCompanyObj();
        employee.setCompany(company);

        Company result = employee.getCompany();
        assertThat(result).isEqualTo(company);
    }

    private Company getCompanyObj() {
        return new Company("CompanyName", "123456798");
    }
}