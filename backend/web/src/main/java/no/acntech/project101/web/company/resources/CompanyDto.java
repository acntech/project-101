package no.acntech.project101.web.company.resources;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@Valid
public record CompanyDto(
        Long id,
        @NotBlank String companyName,
        @NotBlank String orgNr
) {

}
