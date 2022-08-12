package no.acntech.project101.web.employee.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = EmployeeResource.class)
class EmployeeResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private CompanyService companyService;

    @Test
    void findAll() throws Exception {
        final var company = new Company("ACME", "123456789");
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final var tor = new Employee("Tor", "Divel", LocalDate.of(1994, 10, 1));
        ken.setCompany(company);
        tor.setCompany(company);
        when(employeeService.findAll()).thenReturn(Arrays.asList(ken, tor));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/employees")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void findById() throws Exception {
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        ken.setCompany(new Company("ACME", "123456789"));
        when(employeeService.findById(any(Long.class))).thenReturn(Optional.of(ken));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/employees/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void createEmployee() throws Exception {
        final var employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final var company = new Company("ACME", "123456789");

        when(employeeService.save(any(Employee.class))).thenReturn(ken);
        when(companyService.findById(anyLong())).thenReturn(Optional.of(company));

        mockMvc.perform(MockMvcRequestBuilders
                .post("/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    void deleteEmployee() throws Exception {
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        when(employeeService.findById(any(Long.class))).thenReturn(Optional.of(ken));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/employees/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isAccepted());
    }

    @Test
    void updateEmployee() throws Exception {
        final var employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final var company = new Company("ACME", "123456789");

        when(employeeService.findById(anyLong())).thenReturn(Optional.of(ken));
        when(employeeService.save(any(Employee.class))).thenReturn(ken);
        when(companyService.findById(anyLong())).thenReturn(Optional.of(company));

        mockMvc.perform(MockMvcRequestBuilders
                .patch("/employees/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}