package no.acntech.project101.company.service;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.consumer.BrregRestClient;
import no.acntech.project101.company.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    CompanyRepository companyRepository;
    @Mock
    BrregRestClient brregRestClient;

    @InjectMocks
    CompanyService companyService;

    @Test
    void save() {
        final var company = new Company("CompanyName", "123456789");
        when(companyRepository.save(company)).thenReturn(company);

        final var savedCompany = companyService.save(company);

        assertThat(savedCompany.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(savedCompany.getOrgNr()).isEqualTo(company.getOrgNr());
    }

    @Test
    void saveOrgNr() {
        var orgNr = "123456789";
        var companyName = "CompanyName";
        final var company = new Company(companyName, orgNr);
        when(brregRestClient.lookupOrganizationName(orgNr)).thenReturn(companyName);
        when(companyRepository.save(any(Company.class))).thenReturn(company);

        final var savedCompany = companyService.save(orgNr);

        assertThat(savedCompany.getOrgNr()).isEqualTo(orgNr);
        assertThat(savedCompany.getCompanyName()).isEqualTo(companyName);
    }

    @Test
    void findById() {
        final var company = new Company("CompanyName", "123456789");
        when(companyRepository.findById(1L)).thenReturn(Optional.of(company));

        final var foundCompany = companyService.findById(1L).get();

        assertThat(foundCompany.getCompanyName()).isEqualTo(company.getCompanyName());
        assertThat(foundCompany.getOrgNr()).isEqualTo(company.getOrgNr());
    }

    @Test
    void findAll() {
        final var acme = new Company("ACME", "123456789");
        final var umbrella = new Company("Umbrella", "666666666");
        when(companyRepository.findAll()).thenReturn(Arrays.asList(acme, umbrella));

        var companies = companyService.findAll();

        assertThat(companies).hasSize(2);
        assertThat(companies).contains(acme, umbrella);
    }

    @Test
    void deleteExisting() {
        when(companyRepository.existsById(1L)).thenReturn(true);

        companyService.delete(1L);

        verify(companyRepository).deleteById(1L);
    }

    @Test
    void deleteNonExisting() {
        when(companyRepository.existsById(1L)).thenReturn(false);

        companyService.delete(1L);

        verify(companyRepository).existsById(1L);
        verifyNoMoreInteractions(companyRepository);
    }
}