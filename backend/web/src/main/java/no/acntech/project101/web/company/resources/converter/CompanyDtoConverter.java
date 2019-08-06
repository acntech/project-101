package no.acntech.project101.web.company.resources.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import no.acntech.project101.company.Company;
import no.acntech.project101.web.company.resources.CompanyDto;

@Component
public class CompanyDtoConverter implements Converter<Company, CompanyDto> {

    @Override
    public CompanyDto convert(final Company source) {
        return new CompanyDto(source.getId(), source.getCompanyName(), source.getOrgNr());
    }
}
