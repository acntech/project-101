import { ThunkAction } from 'redux-thunk';
import { Company } from '../../types/company';
import { RootStateType } from '../../types/store';
import { get, patch, post, remove } from './api';

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

export type CompanyActionType = 
    CreateCompanyAction |
    CreateCompanyByOrgnrAction |
    GetCompaniesAction |
    GetCompanyAction |
    UpdateCompanyAction |
    DeleteCompanyAction;

const createCompanySuccess = (company: Company): CreateCompanyAction => ({
    type: CREATE_NEW_COMPANY,
    company
});

const getCompaniesSuccess = (companies: Company[]): GetCompaniesAction => ({
    type: GET_ALL_COMPANIES,
    companies
});

const getCompanySuccess = (company: Company): GetCompanyAction => ({
    type: GET_COMPANY_BY_ID,
    company
});

const updateCompanySuccess = (id: string, company: Company): UpdateCompanyAction => ({
    type: UPDATE_COMPANY,
    id,
    company
});

const deleteCompanySuccess = (id: string): DeleteCompanyAction => ({
    type: DELETE_COMPANY,
    id
});

export const createNewCompany = (company: Company): ThunkAction<Promise<Company>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const createdCompany = await post<Company>("/companies", company);
        dispatch(createCompanySuccess(createdCompany));
        return Promise.resolve(createdCompany);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const createNewCompanyByOrgnr = (orgNr: string): ThunkAction<Promise<Company>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const createdCompany = await post<Company>(`/companies/${orgNr}`);
        dispatch(createCompanySuccess(createdCompany));
        return Promise.resolve(createdCompany);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const getCompanies = (): ThunkAction<Promise<Company[]>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const companies = await get<Company[]>("/companies");
        dispatch(getCompaniesSuccess(companies));
        return Promise.resolve(companies);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const readCompanyById = (id: string): ThunkAction<Promise<Company>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const company = await get<Company>(`/companies/${id}`);
        dispatch(getCompanySuccess(company));
        return Promise.resolve(company);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const updateCompany = (id: string, company: Company): ThunkAction<Promise<Company>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const updatedCompany = await patch<Company>(`/companies/${id}`, company);
        dispatch(updateCompanySuccess(id, updatedCompany));
        return Promise.resolve(updatedCompany);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const deleteCompany = (id: string): ThunkAction<Promise<boolean>, RootStateType, undefined, CompanyActionType> => async (dispatch) => {
    try {
        const isCompanyDeleted = await remove<boolean>(`/companies/${id}`);
        dispatch(deleteCompanySuccess(id));
        return Promise.resolve(isCompanyDeleted);
    } catch (err) {
        return Promise.reject(err);
    }
};
