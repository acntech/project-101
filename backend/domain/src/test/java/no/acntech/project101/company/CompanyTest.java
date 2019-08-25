package no.acntech.project101.company;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CompanyTest {

    private static final String COMPANY_NAME = "CompanyName";
    private static final String ORG_NR = "123456789";

    @Test
    void setCompanyName() {
        Company company = new Company();
        company.setCompanyName(COMPANY_NAME);

        assertThat(company.getCompanyName()).isEqualTo(COMPANY_NAME);
    }

    @Test
    void setOrgNr() {
        Company company = new Company();
        company.setOrgNr(ORG_NR);
        assertThat(company.getOrgNr()).isEqualTo(ORG_NR);
    }
}
