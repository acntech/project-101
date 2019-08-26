package no.acntech.project101.web.employee.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
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
        final Company company = new Company("ACME", "123456789");
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final Employee tor = new Employee("Tor", "Divel", LocalDate.of(1994, 10, 1));
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
        //TODO: implement
    }

    @Test
    void createEmployee() throws Exception {
        final EmployeeDto employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final Company company = new Company("ACME", "123456789");

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
        //TODO: implement
    }

    @Test
    void updateEmployee() throws Exception {
        final EmployeeDto employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final Employee ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final Company company = new Company("ACME", "123456789");

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