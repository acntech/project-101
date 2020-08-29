import { Company } from '../../types/company';

export const CREATE_NEW_COMPANY = 'CREATE_NEW_COMPANY';
export const CREATE_NEW_COMPANY_BY_ORGNR = 'CREATE_NEW_COMPANY_BY_ORGNR';
export const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES';
export const GET_COMPANY_BY_ID = 'GET_COMPANY_BY_ID';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';

interface CreateCompanyAction {
    type: typeof CREATE_NEW_COMPANY;
    company: Company;
}

interface CreateCompanyByOrgnrAction {
    type: typeof CREATE_NEW_COMPANY_BY_ORGNR;
    company: Company;
}

interface GetCompaniesAction {
    type: typeof GET_ALL_COMPANIES;
    companies: Company[];
}

interface GetCompanyAction {
    type: typeof GET_COMPANY_BY_ID;
    company: Company;
}

interface UpdateCompanyAction {
    type: typeof UPDATE_COMPANY;
    id: string;
    company: Company;
}

interface DeleteCompanyAction {
    type: typeof DELETE_COMPANY;
    id: string;
}

// TODO: Action creators

export type CompanyActionType = 
    CreateCompanyAction |
    CreateCompanyByOrgnrAction |
    GetCompaniesAction |
    GetCompanyAction |
    UpdateCompanyAction |
    DeleteCompanyAction;