class CompaniesApi {
    constructor() {
        this.baseUrl = 'http://localhost:8080/companies/';
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    createNewCompany(company) {
        return fetch(this.baseUrl, { method: 'POST', body: JSON.stringify(company), headers: this.headers });
    }

    createNewCompanyByOrgnr(orgnr) {
        return fetch(this.baseUrl + orgnr, { method: 'POST', headers: this.headers });
    }

    readAllCompanies() {
        return fetch(this.baseUrl)
            .then((response) => {
                return response.json();
            });
    }

    readCompanyById(id) {
        return fetch(this.baseUrl + id)
            .then((response) => {
                return response.json();
            });
    }

    updateCompany(id, company) {
        return fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(company), headers: this.headers })
            .then((response) => {
                return response.json();
            });
    }

    deleteCompanyById(id) {
        return fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new CompaniesApi();