import { Employee } from '../../types/employee';

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEE_BY_ID';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

interface CreateEmployeeAction {
    type: typeof CREATE_EMPLOYEE;
    employee: Employee;
}

interface GetEmployeesAction {
    type: typeof GET_EMPLOYEES;
    employees: Employee[];
}

interface GetEmployeeByIdAction {
    type: typeof GET_EMPLOYEE_BY_ID;
    employee: Employee;
}

interface UpdateEmployeeAction {
    type: typeof UPDATE_EMPLOYEE;
    employee: Employee;
}

interface DeleteEmployeeAction {
    type: typeof DELETE_EMPLOYEE;
    id: string;
}

// TODO: Action creators

export type EmployeeActionType =
    CreateEmployeeAction |
    GetEmployeesAction |
    GetEmployeeByIdAction |
    UpdateEmployeeAction |
    DeleteEmployeeAction;