import React, { Component } from 'react';
import CompanyCreate from './CompanyCreate';
class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
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
                        <button type="button" className="btn btn-primary">View</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h3 className="card-title">List of companies</h3>
                    <div className="card-action">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#companyCreateModal">
                            Create new
                        </button>
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
                <CompanyCreate/>
            </div>
        );
    }
}

export default CompanyList;