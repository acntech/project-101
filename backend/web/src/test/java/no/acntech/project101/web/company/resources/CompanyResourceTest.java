package no.acntech.project101.web.company.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CompanyResource.class)
class CompanyResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CompanyService companyService;

    @Test
    void findAll() throws Exception {
        final var acme = new Company("ACME", "123456789");
        final var umbrella = new Company("Umbrella", "666666666");
        when(companyService.findAll()).thenReturn(Arrays.asList(acme, umbrella));
        mockMvc.perform(MockMvcRequestBuilders
                .get("/companies")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    void findById() throws Exception {
        //TODO: Implement
    }

    @Test
    void createCompany() throws Exception {
        //TODO: Implement
    }

    @Test
    void createCompanyByOrgNr() throws Exception {
        final var acme = new Company("ACME", "123456789");
        when(companyService.save(any(String.class))).thenReturn(acme);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/companies/{orgnr}", "123456789")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();
    }

    @Test
    void deleteCompany() throws Exception {
        //TODO: Implement
    }

    @Test
    void updateCompany() throws Exception {
        final var companyDto = new CompanyDto(1L, "ACME", "123456789");
        final var acme = new Company("ACME", "123456789");

        when(companyService.findById(anyLong())).thenReturn(Optional.of(acme));
        when(companyService.save(any(Company.class))).thenReturn(acme);

        mockMvc.perform(MockMvcRequestBuilders
                .patch("/companies/{1}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(companyDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}