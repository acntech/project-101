import axios from 'axios';

class EmployeesApi {
    apiClient = axios.create({
        baseURL: 'http://localhost:8080/employees'
    });

    createNewEmployee(employee) {
        return this.apiClient.post('', employee);
    }

    readAllEmployees() {
        return this.apiClient.get('')
            .then((response) => {
                return response.data;
            });
    }

    readEmployeeById(id) {
        return this.apiClient.get('/' + id)
            .then((response) => {
                return response.data;
            });
    }

    updateEmployee(employee) {
    }

    deleteEmployeeById(id) {
        return this.apiClient.delete('/' + id);
    }
}

export default new EmployeesApi();