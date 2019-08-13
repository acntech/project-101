import axios from 'axios';

class CompaniesApi {
    apiClient = axios.create({
        baseURL: 'http://localhost:8080/companies'
    });

    createNewCompany(company) {
        return this.apiClient.post('', company);
    }

    createNewCompanyByOrgnr(orgnr) {
        return this.apiClient.post('/' + orgnr);
    }

    readAllCompanies() {
        return this.apiClient.get('')
            .then((response) => {
                return response.data;
            });
    }

    readCompanyById(id) {
        return this.apiClient.get('/' + id)
            .then((response) => {
                return response.data;
            });
    }

    updateCompany(id, company) {
        return this.apiClient.patch('/' + id, company)
            .then((response) => {
                return response.data;
            });
    }

    deleteCompanyById(id) {
        return this.apiClient.delete('/' + id);
    }
}

export default new CompaniesApi();