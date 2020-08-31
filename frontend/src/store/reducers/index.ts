import { combineReducers } from "redux";
import { companies, company } from './companies-reducer';

export default combineReducers({
    companies,
    company,
});