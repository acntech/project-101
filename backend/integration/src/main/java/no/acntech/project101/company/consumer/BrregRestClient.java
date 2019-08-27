package no.acntech.project101.company.consumer;

import java.net.URI;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import no.acntech.project101.company.model.BrregRespons;

@Component
public class BrregRestClient {

    private final RestTemplate restTemplate;

    private final String url = "https://webapi.no/api/v1/brreg/{orgnr}";

    public BrregRestClient(final RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String lookupOrganizationName(final String organisasjonsnummer) {
        final URI uri = getUri(organisasjonsnummer);

        final BrregRespons brregRespons = restTemplate.getForEntity(uri, BrregRespons.class).getBody();
        return brregRespons.getData().getName();
    }

    private URI getUri(String organisasjonsnummer) {
        return UriComponentsBuilder
                .fromUriString(url)
                .buildAndExpand(organisasjonsnummer)
                .toUri();
    }
}
