import React, { Component } from 'react';
import CreateCompanyModal from '../containers/CreateCompanyModal';
import EditCompanyModal from '../containers/EditCompanyModal';
import DeleteButton from '../containers/DeleteButton';
import { Button, Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import { FaBuilding, FaSyncAlt } from 'react-icons/fa';
import CompaniesApi from '../services/CompaniesApi';

class CompanyListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };

        this.apiDeleteCompany = this.apiDeleteCompany.bind(this);
        this.apiReadAllCompanies = this.apiReadAllCompanies.bind(this);
    }

    componentDidMount() {
        this.apiReadAllCompanies();
    }

    async apiReadAllCompanies() {
        const companies = await CompaniesApi.readAllCompanies();
        this.setState({ companies: companies });
    }

    async apiDeleteCompany(id) {
        await CompaniesApi.deleteCompanyById(id);

        // Retrieve refreshed list of companies from the server
        this.apiReadAllCompanies();
    }

    render() {
        const companies = this.state.companies;

        let companiesRows = companies.map((company) => {
            return (
                <tr key={company.id}>
                    <th scope="row">{company.id}</th>
                    <td>{company.orgNr}</td>
                    <td>{company.companyName}</td>
                    <td className="table-buttons">
                        <EditCompanyModal
                            id={company.id}
                            onEdited={this.apiReadAllCompanies} />
                        <DeleteButton
                            title="Delete company"
                            text="Are you sure you want to delete this company? All connected employees will be deleted as well!"
                            id={company.id}
                            onYes={this.apiDeleteCompany} />
                    </td>
                </tr>
            );
        });

        const companiesTable = (
            <Table dark striped>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Orgnr</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesRows}
                </tbody>
            </Table>
        );

        const emptyTable = (
            <p>No companies yet, use button above to add one!</p>
        );

        return (
            <Card color="white" className="shadow p-3 mb-5 rounded">
                <CardBody>
                    <CardTitle tag="h3"><FaBuilding /> List of companies</CardTitle>
                    <div className="card-action">
                        <Button color="secondary" onClick={this.apiReadAllCompanies}><FaSyncAlt /></Button> {' '}
                        <CreateCompanyModal onCreated={this.apiReadAllCompanies} />
                    </div>
                    <CardText tag="div">
                        {companies.length > 0 ? companiesTable : emptyTable}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default CompanyListPage;
