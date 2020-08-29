import { combineReducers } from "redux";
import { companies, company } from './companies-reducer';
import { employees, employee } from './employees-reducer';

export default combineReducers({
    companies,
    company,
    employees,
    employee
});