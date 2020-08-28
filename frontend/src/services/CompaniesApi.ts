class CompaniesApi {

    private baseUrl: string;
    private headers: Headers;

    constructor() {
        this.baseUrl = 'http://localhost:8080/companies/';
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    async createNewCompany(company: any) {
        return await fetch(this.baseUrl, { method: 'POST', body: JSON.stringify(company), headers: this.headers });
    }

    async createNewCompanyByOrgnr(orgnr: any) {
        return await fetch(this.baseUrl + orgnr, { method: 'POST', headers: this.headers });
    }

    async readAllCompanies() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async readCompanyById(id: any) {
        const response = await fetch(this.baseUrl + id);
        return await response.json();
    }

    async updateCompany(id: any, company: any) {
        const response = await fetch(this.baseUrl + id, { method: 'PATCH', body: JSON.stringify(company), headers: this.headers });
        return await response.json();
    }

    async deleteCompanyById(id: any) {
        return await fetch(this.baseUrl + id, { method: 'DELETE', headers: this.headers });
    }
}

export default new CompaniesApi();