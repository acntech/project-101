import React, { Component } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import { FaBuilding, FaSyncAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { DeleteButton, CreateCompanyModalConnected, EditCompanyModalConnected } from '../containers';
import { RootStateType } from '../types/store';
import { getCompanies, deleteCompany } from '../store/actions/companies-actions';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class CompanyListPage extends Component<Props> {

    componentDidMount() {
        this.apiReadAllCompanies();
    }

    apiReadAllCompanies = async () => {
        this.props.getCompanies();
    }

    apiDeleteCompany = async (id: any) => {
        await this.props.removeCompany(id);
        this.apiReadAllCompanies();
    }

    render() {
        const companies = this.props.companies || [];

        let companiesRows: any = [];
        companies.map((company: any) => {
            return companiesRows.push(
                <tr key={company.id}>
                    <th scope="row">{company.id}</th>
                    <td>{company.orgNr}</td>
                    <td>{company.companyName}</td>
                    <td className="table-buttons">
                        <EditCompanyModalConnected
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
                        <CreateCompanyModalConnected onCreated={this.apiReadAllCompanies} />
                    </div>
                    <CardText tag="div">
                        {companies.length > 0 ? companiesTable : emptyTable}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    companies: state.companies
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStateType, undefined, AnyAction>) => ({
    getCompanies: () => dispatch(getCompanies()),
    removeCompany: (id: string) => dispatch(deleteCompany(id))
});

const CompanyListPageConnected = connect(mapStateToProps, mapDispatchToProps)(CompanyListPage);

export { CompanyListPageConnected, CompanyListPage };
