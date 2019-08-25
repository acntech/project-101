package no.acntech.project101.web.employee.resources.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import no.acntech.project101.employee.Employee;
import no.acntech.project101.web.employee.resources.EmployeeDto;

@Component
public class EmployeeConverter implements Converter<EmployeeDto, Employee> {

    @Override
    public Employee convert(final EmployeeDto source) {
        //TODO Map from DTO to employee
        return null;
    }
}
