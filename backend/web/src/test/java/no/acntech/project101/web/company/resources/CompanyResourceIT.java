package no.acntech.project101.web.company.resources;

import no.acntech.project101.Project101Application;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.web.TestUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CompanyResourceIT {

    @LocalServerPort
    private int port;

    @Autowired
    TestRestTemplate testRestTemplate;

    @SpyBean
    private CompanyService companyService;

    @Test
    void findAll() {
        final Company acme = new Company("ACME", "123456789");
        final Company umbrella = new Company("Umbrella", "666666666");
        doReturn(Arrays.asList(acme, umbrella)).when(companyService).findAll();

        ResponseEntity<CompanyDto[]> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies"),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                CompanyDto[].class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<CompanyDto> companies = Arrays.asList(response.getBody());
        assertThat(companies).hasSize(2);
    }

    @Test
    void findById() {
        final Company company = new Company("CompanyName", "123456789");

        doReturn(Optional.of(company)).when(companyService).findById(1L);

        ResponseEntity<CompanyDto> response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/1"),
                HttpMethod.GET,
                new HttpEntity<>(null, new HttpHeaders()),
                CompanyDto.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        CompanyDto companyDto = response.getBody();
        assertThat(companyDto.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(companyDto.getOrgNr()).isEqualTo(company.getOrgNr());

    }

    @Test
    void createCompany() {
        final Company company = new Company("CompanyName", "123456789");
        doReturn(company).when(companyService).save(company);

        HttpEntity<Company> entity = new HttpEntity<>(company, new HttpHeaders());

        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/"),
                HttpMethod.POST,
                entity,
                ResponseEntity.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getHeaders().get(HttpHeaders.LOCATION).get(0)).contains("/companies/1");
    }

    @Test
    void createCompanyByOrgNr() {
        String orgNr = "123456789";
        final Company company = new Company("CompanyName", "123456789");
        doReturn(company).when(companyService).save(orgNr);

        HttpEntity<String> entity = new HttpEntity<>("123456789", new HttpHeaders());
        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/"+orgNr),
                HttpMethod.POST,
                entity,
                ResponseEntity.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void deleteCompany() {
        ResponseEntity response = testRestTemplate.exchange(
                TestUtil.createURL(port, "/companies/1"),
                HttpMethod.DELETE,
                new HttpEntity<>(null, new HttpHeaders()),
                ResponseEntity.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}