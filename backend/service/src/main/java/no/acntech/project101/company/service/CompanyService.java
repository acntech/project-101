package no.acntech.project101.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.consumer.BrregRestClient;
import no.acntech.project101.company.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final BrregRestClient brregRestClient;

    public CompanyService(final CompanyRepository companyRepository,
                          final BrregRestClient brregRestClient) {
        this.companyRepository = companyRepository;
        this.brregRestClient = brregRestClient;
    }

    public Company save(Company company) {
        return companyRepository.save(company);
    }

    public Company save(final String organizationNumber) {
        final String organizationName = brregRestClient.lookupOrganizationName(organizationNumber);

        final Company company = new Company(organizationName, organizationNumber);
        return save(company);
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Optional<Company> findById(Long id) {
        return companyRepository.findById(id);
    }

    public void delete(Long id) {
        if (companyRepository.existsById(id)) {
            companyRepository.deleteById(id);
        }
    }
}
