import { Company } from "./company";
import { AppError } from "./error";

export interface RootStateType {
    companies: CompaniesState;
    company: CompanyState;
    errors: ErrorState;
}
