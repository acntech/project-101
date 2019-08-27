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

@DataJpaTest
@Import({CompanyDatabaseConfig.class, EmployeeDatabaseConfig.class})
@ContextConfiguration(classes = CompanyRepository.class)
class CompanyRepositoryTest {

    public static final String ORG_NR = "123456789";
    public static final String COMPANY_NAME = "CompanyName";
    @Autowired
    private CompanyRepository companyRepository;

    @Test
    void save() {
        final Company company = new Company(COMPANY_NAME, ORG_NR);
        final Company savedCompany = companyRepository.save(company);
        assertThat(savedCompany.getId()).isNotNull();
        assertThat(savedCompany.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(savedCompany.getOrgNr()).isEqualTo(company.getOrgNr());
    }
}
