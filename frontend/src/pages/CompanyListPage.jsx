import React, {Component} from 'react';
import CreateCompanyModal from '../containers/CreateCompanyModal';
import EditCompanyModal from "../containers/EditCompanyModal";
import DeleteButton from '../containers/DeleteButton';

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
        this.setState({companies: companies});
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
                        <EditCompanyModal id={company.id}/>
                        <DeleteButton
                            title="Delete company"
                            text="Are you sure you want to delete this company?"
                            id={company.id}
                            onYes={this.apiDeleteCompany}/>
                    </td>
                </tr>
            );
        });

        return (
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h3 className="card-title">List of companies</h3>
                    <div className="card-action">
                        <CreateCompanyModal/>
                    </div>
                    <div className="card-text">
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
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
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyListPage;
