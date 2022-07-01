package no.acntech.project101.web.company.resources;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.web.company.resources.converter.CompanyConverter;
import no.acntech.project101.web.company.resources.converter.CompanyDtoConverter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("companies")
public class CompanyResource {

    private final CompanyService companyService;
    private final CompanyDtoConverter companyDtoConverter;
    private final CompanyConverter companyConverter;

    public CompanyResource(final CompanyService companyService,
                           final CompanyDtoConverter companyDtoConverter,
                           final CompanyConverter companyConverter) {
        this.companyService = companyService;
        this.companyDtoConverter = companyDtoConverter;
        this.companyConverter = companyConverter;
    }

    @GetMapping
    public ResponseEntity<List<CompanyDto>> findAll() {
        final var companies = companyService.findAll();
        final var collect = companies.stream()
                .map(companyDtoConverter::convert)
                .collect(Collectors.toList());

        return ResponseEntity.ok(collect);
    }

    @GetMapping("{id}")
    public ResponseEntity<CompanyDto> findById(@PathVariable final Long id) {
        final var company = companyService.findById(id);

        if (company.isPresent()) {
            final var convert = companyDtoConverter.convert(company.get());
            return ResponseEntity.ok(convert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity createCompany(@RequestBody @Validated final CompanyDto companyDto) {
        final var convert = companyConverter.convert(companyDto);
        final var saved = companyService.save(convert);
        final var uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PostMapping("{orgnr}")
    public ResponseEntity createCompany(@PathVariable final String orgnr) {
        final var saved = companyService.save(orgnr);
        final var uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteCompany(@PathVariable final Long id) {
        final var company = companyService.findById(id);

        if (company.isPresent()) {
            companyService.delete(id);
            return ResponseEntity.accepted().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity updateCompany(@PathVariable final Long id, @RequestBody final CompanyDto companyDto) {
        final var optionalCompany = companyService.findById(id);

        if (optionalCompany.isPresent()) {
            var existingCompany = optionalCompany.get();
            existingCompany.setCompanyName(companyDto.companyName());
            existingCompany.setOrgNr(companyDto.orgNr());

            var saved = companyService.save(existingCompany);

            final var convert = companyDtoConverter.convert(saved);
            return ResponseEntity.ok(convert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
