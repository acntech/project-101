package no.acntech.project101.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import no.acntech.project101.employee.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
