package no.acntech.project101.company.repository;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.config.CompanyDatabaseConfig;
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

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnableAutoConfiguration
@ExtendWith(SpringExtension.class)
@Import({CompanyDatabaseConfig.class, EmployeeDatabaseConfig.class})
@ImportAutoConfiguration(FlywayAutoConfiguration.class)
@ContextConfiguration(classes = CompanyRepository.class)
class CompanyRepositoryTest {

    @Autowired
    private CompanyRepository companyRepository;

    @Test
    void save() {
        final Company company = new Company("CompanyName", "123456789");
        final Company savedCompany = companyRepository.save(company);
        assertThat(savedCompany.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(savedCompany.getOrgNr()).isEqualTo(company.getOrgNr());
    }
}