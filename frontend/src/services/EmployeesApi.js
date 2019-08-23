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

    readAllEmployees() {
        return fetch(this.baseUrl)
            .then((response) => {
                return response.json();
            });
    }

    readEmployeeById(id) {
        return fetch(this.baseUrl + id)
            .then((response) => {
                return response.json();
            });
    }

    updateEmployee(id, employee) {
        return fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(employee), headers: this.headers })
            .then((response) => {
                return response.json();
            });
    }

    deleteEmployeeById(id) {
        return fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new EmployeesApi();