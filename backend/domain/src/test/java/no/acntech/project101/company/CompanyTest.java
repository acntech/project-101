package no.acntech.project101.company;

import no.acntech.project101.employee.Employee;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class CompanyTest {

    private static final String COMPANY_NAME = "CompanyName";
    private static final String ORG_NR = "123456789";

    @Test
    void getCompanyName() {
        Company company = new Company(COMPANY_NAME, ORG_NR);
        String result = company.getCompanyName();
        assertThat(result).isEqualTo(COMPANY_NAME);
    }

    @Test
    void setCompanyName() {
        Company company = new Company();
        company.setCompanyName(COMPANY_NAME);

        assertThat(company.getCompanyName()).isEqualTo(COMPANY_NAME);
    }

    @Test
    void getOrgNr() {
        Company company = new Company(COMPANY_NAME, ORG_NR);
        String result = company.getOrgNr();
        assertThat(result).isEqualTo(ORG_NR);
    }

    @Test
    void setOrgNr() {
        Company company = new Company();
        company.setOrgNr(ORG_NR);
        assertThat(company.getOrgNr()).isEqualTo(ORG_NR);
    }

    @Test
    void getEmployees() {
        Company company = new Company();
        List<Employee> employees = getEmployeeList();
        company.setEmployees(employees);

        List<Employee> result = company.getEmployees();
        for (Employee e : employees) {
            assertThat(result).contains(e);
        }
        assertThat(result).hasSize(employees.size());
    }

    @Test
    void setEmployees() {
        Company company = new Company();
        List<Employee> employees = getEmployeeList();
        company.setEmployees(employees);

        List<Employee> result = company.getEmployees();
        for (Employee e : employees) {
            assertThat(result).contains(e);
        }
        assertThat(result).hasSize(employees.size());
    }

    private List<Employee> getEmployeeList() {
        List<Employee> employees = new ArrayList<>();
        Employee ola = new Employee("Ola", "Nordmann", LocalDate.of(2019, 1, 1));
        Employee kari = new Employee("Kari", "Svingtrapp", LocalDate.of(2019, 1, 1));
        employees.add(ola);
        employees.add(kari);
        return employees;
    }
}