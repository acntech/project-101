import { addErrorSuccess, ErrorsActionType } from './errors-actions';
import { ThunkAction } from 'redux-thunk';
import { Company } from '../../types/company';
import { RootStateType } from '../../types/store';
import { get, patch, post, remove } from './api';
import { AppError } from '../../types/error';
import { Action } from 'redux';

export const CREATE_NEW_COMPANY = 'CREATE_NEW_COMPANY';
export const CREATE_NEW_COMPANY_BY_ORGNR = 'CREATE_NEW_COMPANY_BY_ORGNR';
export const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES';
export const GET_COMPANY_BY_ID = 'GET_COMPANY_BY_ID';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';

type AppThunkAction<T, U extends Action> = ThunkAction<T, RootStateType, undefined, U>;

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

export const createNewCompany = (company: Company): AppThunkAction<void, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const createdCompany = await post<Company>("/companies", company);
        if (typeof createdCompany !== "boolean") {
            dispatch(createCompanySuccess(createdCompany));
        }
    } catch (err) {
        const error: AppError = {
            message: "Failed to create new company"
        };
        dispatch(addErrorSuccess(error));
    }
};

export const createNewCompanyByOrgnr = (orgNr: string): AppThunkAction<void, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const createdCompany = await post<Company>(`/companies/${orgNr}`);
        if (typeof createdCompany !== "boolean") {
            dispatch(createCompanySuccess(createdCompany));
        }
    } catch (err) {
        const error: AppError = {
            message: "Failed to create new company by orgnr"
        };
        dispatch(addErrorSuccess(error));
    }
};

export const getCompanies = (): AppThunkAction<Promise<Company[]>, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const companies = await get<Company[]>("/companies");
        if (typeof companies !== "boolean") {
            dispatch(getCompaniesSuccess(companies));
            return Promise.resolve(companies);
        }
        return Promise.resolve([]);
    } catch (err) {
        const error: AppError = {
            message: "Failed to fetch companies"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};

export const readCompanyById = (id: string): AppThunkAction<Promise<Company | null>, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const company = await get<Company>(`/companies/${id}`);
        if (typeof company !== "boolean") {
            dispatch(getCompanySuccess(company));
            return Promise.resolve(company);
        }
        return Promise.resolve(null);
    } catch (err) {
        const error: AppError = {
            message: "Failed to get company"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};

export const updateCompany = (id: string, company: Company): AppThunkAction<void, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const updatedCompany = await patch<Company>(`/companies/${id}`, company);
        if (typeof updatedCompany !== "boolean") {
            dispatch(updateCompanySuccess(id, updatedCompany));
        }
    } catch (err) {
        const error: AppError = {
            message: "Failed to update company"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};

export const deleteCompany = (id: string): AppThunkAction<void, CompanyActionType | ErrorsActionType> => async (dispatch) => {
    try {
        const isCompanyDeleted = await remove<boolean>(`/companies/${id}`);
        dispatch(deleteCompanySuccess(id));
        return Promise.resolve(isCompanyDeleted);
    } catch (err) {
        const error: AppError = {
            message: "Failed to delete company"
        };
        dispatch(addErrorSuccess(error));
        return Promise.reject(err);
    }
};
