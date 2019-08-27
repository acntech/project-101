/** TODO If you have time to implement support for connecting an employee to a company
 *  TODO then you can use this test. probably need to change something to make it compile...
*/package no.acntech.project101.web.employee.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.acntech.project101.company.Company;
import no.acntech.project101.company.service.CompanyService;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import no.acntech.project101.web.employee.resources.EmployeeDto;
import no.acntech.project101.web.employee.resources.EmployeeResource;

import org.junit.jupiter.api.Disabled;
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
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = EmployeeResource.class)
//@Disabled // TODO Remove this to run the tests. This annotation diables the tests
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
        final Employee ken = new Employee();
        final Employee tor = new Employee();
//        ken.setCompany(company);
//        tor.setCompany(company);
        lenient().when(employeeService.findAll()).thenReturn(Arrays.asList(ken, tor));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/employees")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void findById() throws Exception {
        final Employee ken = new Employee();
//        ken.setCompany(new Company("ACME", "123456789"));
        lenient().when(employeeService.findById(any(Long.class))).thenReturn(Optional.of(ken));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/employees/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void createEmployee() throws Exception {
        final EmployeeDto employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final Employee ken = new Employee();
        final Company company = new Company("ACME", "123456789");

        lenient().when(employeeService.save(any(Employee.class))).thenReturn(ken);
        lenient().when(companyService.findById(anyLong())).thenReturn(Optional.of(company));

        mockMvc.perform(MockMvcRequestBuilders
                .post("/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    void deleteEmployee() throws Exception {
        final Employee ken = new Employee();
        lenient().when(employeeService.findById(any(Long.class))).thenReturn(Optional.of(ken));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/employees/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isAccepted());
    }

    @Test
    void updateEmployee() throws Exception {
        final EmployeeDto employeeDto = new EmployeeDto(1L, "Ken", "Guru", LocalDate.of(1994, 10, 1), 1L);
        final Employee ken = new Employee();
        final Company company = new Company("ACME", "123456789");

        lenient().when(employeeService.findById(anyLong())).thenReturn(Optional.of(ken));
        lenient().when(employeeService.save(any(Employee.class))).thenReturn(ken);
        lenient().when(companyService.findById(anyLong())).thenReturn(Optional.of(company));

        mockMvc.perform(MockMvcRequestBuilders
                .patch("/employees/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto))
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
