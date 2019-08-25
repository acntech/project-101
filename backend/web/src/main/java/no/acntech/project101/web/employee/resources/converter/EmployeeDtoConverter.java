package no.acntech.project101.web.employee.resources.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import no.acntech.project101.employee.Employee;
import no.acntech.project101.web.employee.resources.EmployeeDto;

@Component
public class EmployeeDtoConverter implements Converter<Employee, EmployeeDto> {

    @Override
    public EmployeeDto convert(final Employee source) {
        //TODO map from employee to dto
        return null;
    }
}
