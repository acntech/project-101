package no.acntech.project101.company.repository;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.config.CompanyDatabaseConfig;
import no.acntech.project101.employee.config.EmployeeDatabaseConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The purpose of these tests is only to show an example on syntax!
 *
 * These tests are not really testing anything other than that the test framework is behaving as expected, as there is
 * no actual functionality being tested.
 */
@DataJpaTest
@Import({CompanyDatabaseConfig.class, EmployeeDatabaseConfig.class})
@ContextConfiguration(classes = CompanyRepository.class)
class CompanyRepositoryTest {

    @Autowired
    private CompanyRepository companyRepository;

    @Test
    void save() {
        final var company = new Company("CompanyName", "123456789");
        final var savedCompany = companyRepository.save(company);
        assertThat(savedCompany.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(savedCompany.getOrgNr()).isEqualTo(company.getOrgNr());
    }
}