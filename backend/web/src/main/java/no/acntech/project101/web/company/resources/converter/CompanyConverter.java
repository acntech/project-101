package no.acntech.project101.web.company.resources.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import no.acntech.project101.company.Company;
import no.acntech.project101.web.company.resources.CompanyDto;

@Component
public class CompanyConverter implements Converter<CompanyDto, Company> {

    @Override
    public Company convert(final CompanyDto source) {
        return new Company(source.getCompanyName(), source.getOrgNr());
    }
}
