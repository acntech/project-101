import React, { Component } from 'react';
import CreateCompanyModal from '../containers/CreateCompanyModal';
import EditCompanyModal from '../containers/EditCompanyModal';
import DeleteButton from '../containers/DeleteButton';
import { Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import { FaBuilding } from 'react-icons/fa';

class CompanyListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };

        this.apiDeleteCompany = this.apiDeleteCompany.bind(this);
    }

    componentDidMount() {
        this.apiGetCompanies();
    }

    apiGetCompanies() {
        const companies = [
            {
                id: 1,
                orgNr: 123456789,
                companyName: 'Accenture Oslo'
            },
            {
                id: 2,
                orgNr: 123456789,
                companyName: 'Accenture Bergen'
            },
            {
                id: 3,
                orgNr: 123456789,
                companyName: 'Accenture Trondheim'
            }
        ];
        this.setState({ companies: companies });
    }

    apiDeleteCompany(id) {
        console.log('Delete company called, id: ' + id);
    }

    render() {
        const companies = this.state.companies;

        let companiesRows = [];
        companies.map((company) => {
            return companiesRows.push(
                <tr key={company.id}>
                    <th scope="row">{company.id}</th>
                    <td>{company.orgNr}</td>
                    <td>{company.companyName}</td>
                    <td className="table-buttons">
                        <EditCompanyModal id={company.id} />
                        <DeleteButton
                            title="Delete company"
                            text="Are you sure you want to delete this company?"
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
                        <CreateCompanyModal />
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
