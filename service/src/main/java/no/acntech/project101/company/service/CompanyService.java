package no.acntech.project101.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(final CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company save(Company company) {
        return companyRepository.save(company);
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
