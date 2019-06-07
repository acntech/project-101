package no.acntech.project101.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import no.acntech.project101.company.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
