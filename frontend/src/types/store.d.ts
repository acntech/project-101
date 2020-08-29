import { Employee } from "./Employee";
import { Company } from "./company";

export interface RootStateType {
    employees: EmployeeState;
    companies: CompanyState;
}