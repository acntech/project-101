package no.acntech.project101.company.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import no.acntech.project101.company.Company;
import org.springframework.web.server.MethodNotAllowedException;

@Service
public class CompanyService {

    private final List<Company> companyList;

    public CompanyService(List<Company> companyList) {
        this.companyList = companyList;
    }

    public Company save(Company company) {
        companyList.add(company);
        return company;
    }

    public Company save(final String organizationNumber) {
        throw new MethodNotAllowedException("Not yet supported!", null);
    }

    public List<Company> findAll() {
        return companyList;
    }

    public Optional<Company> findById(Long id) {
        return companyList.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public void delete(Long id) {
        companyList.removeIf(c -> c.getId().equals(id));
    }
}
