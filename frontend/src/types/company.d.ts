export interface Company {
    id: string;
    companyName: string;
    orgNr: string;
}

export type CompaniesState = Company[];
export type CompanyState = Company;