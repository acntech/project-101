import {
    CREATE_NEW_COMPANY, 
    CREATE_NEW_COMPANY_BY_ORGNR,     
    GET_ALL_COMPANIES,
    GET_COMPANY_BY_ID,
    UPDATE_COMPANY,
    DELETE_COMPANY } from './../actions/companies-actions';
import { CompanyActionType } from '../actions/companies-actions';
import { CompaniesState, CompanyState } from '../../types/company';

const initialCompaniesState: CompaniesState = [];

export function companies(state = initialCompaniesState, action: CompanyActionType): CompaniesState {
    switch (action.type) {
        case CREATE_NEW_COMPANY:
            return [...state, action.company];
        case CREATE_NEW_COMPANY_BY_ORGNR:
            return [...state, action.company];
        case GET_ALL_COMPANIES: 
            return [...initialCompaniesState, ...action.companies];
        default:
            return state; 
    }
}

const initialCompanyState: CompanyState = {
    id: '',
    companyName: '',
    orgNr: ''
};

export function company(state = initialCompanyState, action: CompanyActionType): CompanyState {
    switch (action.type) {
        case GET_COMPANY_BY_ID:
            return {...state, ...action.company};
        case UPDATE_COMPANY:
            return {...state, ...action.company};
        case DELETE_COMPANY:
            return state;
        default:
            return state;
    }
}