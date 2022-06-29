package no.acntech.project101.company.consumer;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import no.acntech.project101.company.model.BrregRespons;

@Component
public class BrregRestClient {

    private final WebClient webClient;

    private final String url = "https://webapi.no/api/v1/brreg/{orgnr}";

    public BrregRestClient(final WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String lookupOrganizationName(final String organisasjonsnummer) {
        final var uri = UriComponentsBuilder
                .fromUriString(url)
                .buildAndExpand(organisasjonsnummer)
                .toUri();

        final var brregRespons = webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(BrregRespons.class)
                .blockOptional();

        return brregRespons.map(respons -> respons.data().name())
                .orElse(null);
    }
}
