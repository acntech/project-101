export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    companyId: string;
}

export type EmployeesState = Employee[];
export type EmployeeState = Employee;