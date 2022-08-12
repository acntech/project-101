package no.acntech.project101.employee.service;

import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

/**
 * The purpose of these tests is only to show an example on syntax!
 *
 * These tests are not really testing anything other than that the test framework is behaving as expected, as there is
 * no actual functionality being tested.
 */
@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void save() {
        final var employee = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        when(employeeRepository.save(employee)).thenReturn(employee);

        final var savedEmployee = employeeService.save(employee);

        assertThat(savedEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        assertThat(savedEmployee.getLastName()).isEqualTo(employee.getLastName());
        assertThat(savedEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }

    @Test
    void findById() {
        final var employee = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        final var foundEmployee = employeeService.findById(1L).get();

        assertThat(foundEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        assertThat(foundEmployee.getLastName()).isEqualTo(employee.getLastName());
        assertThat(foundEmployee.getDateOfBirth()).isEqualTo(employee.getDateOfBirth());
    }

    @Test
    void findAll() {
        final var ken = new Employee("Ken", "Guru", LocalDate.of(1994, 10, 1));
        final var tor = new Employee("Tor", "Divel", LocalDate.of(1994, 10, 1));
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(ken, tor));

        var employees = employeeService.findAll();

        assertThat(employees).hasSize(2);
        assertThat(employees).contains(ken, tor);
    }

    @Test
    void deleteExisting() {
        when(employeeRepository.existsById(1L)).thenReturn(true);

        employeeService.delete(1L);

        verify(employeeRepository).deleteById(1L);
    }

    @Test
    void deleteNonExisting() {
        when(employeeRepository.existsById(1L)).thenReturn(false);

        employeeService.delete(1L);

        verify(employeeRepository).existsById(1L);
        verifyNoMoreInteractions(employeeRepository);
    }
}