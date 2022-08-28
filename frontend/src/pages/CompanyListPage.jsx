import React from 'react';
import {FaBuilding, FaSyncAlt} from 'react-icons/fa';
import {Button, Card, CardBody, CardText, CardTitle, Table} from 'reactstrap';
import DeleteButton from '../containers/DeleteButton';
import EditCompanyModal from '../containers/EditCompanyModal';
import CompaniesApi from '../services/CompaniesApi';

const CompanyListPage = () => {
    const [companies, setCompanies] = React.useState([]);

    React.useEffect(() => {
        apiReadAllCompanies()
    }, []);

    const apiReadAllCompanies = async () => {
        const allCompanies = await CompaniesApi.readAllCompanies();
        setCompanies(allCompanies);
    };

    const apiDeleteCompany = async (id) => {
        await CompaniesApi.deleteCompanyById(id);

        // Retrieve refreshed list of companies from the server
        apiReadAllCompanies();
    }

    return (
        <Card color="white" className="shadow p-3 mb-5 rounded">
            <CardBody>
                <CardTitle tag="h3"><FaBuilding />List of companies</CardTitle>
                <div className="card-action">
                    <Button color="secondary" onClick={apiReadAllCompanies}><FaSyncAlt /></Button>
                </div>
                <CardText tag="div">
                    {companies.length > 0 ?
                            <CompaniesTable>
                                {companies.map(company =>
                                    <CompanyRow key={company.id} company={company} readAllCompanies={apiReadAllCompanies} deleteCompany={apiDeleteCompany} />
                                )}
                            </CompaniesTable> :
                            <NoCompaniesText/>
                    }
                </CardText>
            </CardBody>
        </Card>
    );
}

const CompanyRow = (props) => {
    return (
        <tr key={props.company.id}>
            <th scope="row">{props.company.id}</th>
            <td>{props.company.orgNr}</td>
            <td>{props.company.companyName}</td>
            <td className="table-buttons">
                <EditCompanyModal
                    id={props.company.id}
                    onEdited={props.readAllCompanies} />
                <DeleteButton
                    title="Delete company"
                    text="Are you sure you want to delete this company? All connected employees will be deleted as well!"
                    id={props.company.id}
                    onYes={props.deleteCompany} />
            </td>
        </tr>
    );
}

const CompaniesTable = (props) => {
    return (
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
                {props.children}
            </tbody>
        </Table>
    )
}

const NoCompaniesText = () => {
    return (
        <p>No companies yet, use button above to add one!</p>
    )
}

export default CompanyListPage;
