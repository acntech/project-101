import { combineReducers } from "redux";
import { companies, company } from './companies-reducer';
import { errors } from './errors-reducer';

export default combineReducers({
    companies,
    company,
    errors
});
