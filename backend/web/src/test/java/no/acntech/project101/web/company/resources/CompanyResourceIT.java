package no.acntech.project101.web.company.resources;

import no.acntech.project101.Project101Application;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.consumer.BrregRestClient;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.web.TestUtil;
import org.assertj.core.groups.Tuple;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;


@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CompanyResourceIT {

    @LocalServerPort
    private int port;

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    private CompanyService companyService;

    @MockBean
    private BrregRestClient brregRestClient;

    @Test
    void findAll() {
        //TODO: Implement
    }

    @Test
    void findById() {
        final Company acme = new Company("ACME", "123456789");
        final Company savedCompany = companyService.save(acme);

        ResponseEntity<CompanyDto> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/" + savedCompany.getId()),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                CompanyDto.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        CompanyDto companyDto = response.getBody();
        assertThat(companyDto.getCompanyName()).isEqualTo(savedCompany.getCompanyName());
        assertThat(companyDto.getOrgNr()).isEqualTo(savedCompany.getOrgNr());

    }

    @Test
    void createCompany() {
        //TODO: Implement
    }

    @Test
    void createCompanyByOrgNr() {
        String orgNr = "123456789";
        doReturn(orgNr).when(brregRestClient).lookupOrganizationName(anyString());

        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/"+orgNr),
                HttpMethod.POST,
                null,
                ResponseEntity.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void deleteCompany() {
        final Company acme = companyService.save(new Company("ACME", "123456789"));
        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/" + acme.getId()),
                HttpMethod.DELETE,
                new HttpEntity<>(null, new HttpHeaders()),
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}