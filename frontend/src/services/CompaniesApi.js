class CompaniesApi {
    constructor() {
        this.baseUrl = 'http://localhost:8080/companies/';
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    async createNewCompany(company) {
        return await fetch(this.baseUrl, { method: 'POST', body: JSON.stringify(company), headers: this.headers });
    }

    async createNewCompanyByOrgnr(orgnr) {
        return await fetch(this.baseUrl + orgnr, { method: 'POST', headers: this.headers });
    }

    async readAllCompanies() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async readCompanyById(id) {
        const response = await fetch(this.baseUrl + id);
        return await response.json();
    }

    async updateCompany(id, company) {
        const response = await fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(company), headers: this.headers });
        return await response.json();
    }

    async deleteCompanyById(id) {
        return await fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new CompaniesApi();