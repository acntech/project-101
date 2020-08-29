import { EmployeeActionType } from '../actions/employees-actions';
import { EmployeesState, EmployeeState } from '../../types/employee';

const initialEmployeesState: EmployeesState = [];

export function employees (state = initialEmployeesState, action: EmployeeActionType) {
    switch (action.type) {
        case "CREATE_EMPLOYEE":
            return [...state, action.employee];
        case "DELETE_EMPLOYEE":
            return state;
        case "UPDATE_EMPLOYEE":
            return state;
        case "GET_EMPLOYEES":
            return [...state, action.employees];
        
        default:
            return state;
    }
}

const initialEmployeeState: EmployeeState = {
    id: '',
    companyId: '',
    dateOfBirth: new Date(),
    firstName: '',
    lastName: ''
};

export function employee (state = initialEmployeeState, action: EmployeeActionType) {
    switch (action.type) {
        case "CREATE_EMPLOYEE":
            return {...state, ...action.employee};
        case "DELETE_EMPLOYEE":
            return state;
        case "UPDATE_EMPLOYEE":
            return {...state, ...action.employee};
        case "GET_EMPLOYEE_BY_ID": 
            return {...state, ...action.employee};
        default:
            return state;
    }
}