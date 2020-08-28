class EmployeesApi {

    private baseUrl: string;
    private headers: Headers;

    constructor() {
        this.baseUrl = 'http://localhost:8080/employees/';
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    async createNewEmployee(employee: any) {
        return await fetch(this.baseUrl, { method: 'POST', body: JSON.stringify(employee), headers: this.headers });
    }

    async readAllEmployees() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async readEmployeeById(id: any) {
        const response = await fetch(this.baseUrl + id);
        return await response.json();
    }

    async updateEmployee(id: any, employee: any) {
        const response = await fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(employee), headers: this.headers });
        return await response.json();
    }

    async deleteEmployeeById(id: any) {
        return await fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new EmployeesApi();