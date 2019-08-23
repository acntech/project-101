class EmployeesApi {
    constructor() {
        this.baseUrl = 'http://localhost:8080/employees/';
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    createNewEmployee(employee) {
        return fetch(this.baseUrl, { method: 'POST', body: JSON.stringify(employee), headers: this.headers });
    }

    async readAllEmployees() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async readEmployeeById(id) {
        const response = await fetch(this.baseUrl + id);
        return await response.json();
    }

    async updateEmployee(id, employee) {
        const response = await fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(employee), headers: this.headers });
        return await response.json();
    }

    deleteEmployeeById(id) {
        return fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new EmployeesApi();