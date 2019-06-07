package no.acntech.project101.web.company.resources;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Valid
public class CompanyDto {

    private Long id;
    @NotBlank
    private String companyName;
    @NotBlank
    private String orgNr;

    public CompanyDto(final Long id, @NotBlank final String companyName, @NotBlank final String orgNr) {
        this.id = id;
        this.companyName = companyName;
        this.orgNr = orgNr;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getOrgNr() {
        return orgNr;
    }
}
