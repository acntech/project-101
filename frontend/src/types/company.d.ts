import { Employee } from "./employee";

export interface Company {
    id: string;
    companyName: string;
    orgNr: string;
    // ? employees: Employee[];
}

export type CompaniesState = Company[];
export type CompanyState = Company;