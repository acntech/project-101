import React from 'react';
import { FaSyncAlt, FaUserTie } from 'react-icons/fa';
import { Button, Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import CreateEmployeeModal from '../containers/CreateEmployeeModal';
import DeleteButton from '../containers/DeleteButton';
import EditEmployeeModal from '../containers/EditEmployeeModal';
import EmployeesApi from '../services/EmployeesApi';

const EmployeeListPage = () => {
    const [employees, setEmployees] = React.useState([]);

    React.useEffect(() => {
        apiReadAllEmployees();
    }, []);

    const apiReadAllEmployees = async () => {
        const allEmployees = await EmployeesApi.readAllEmployees();
        setEmployees(allEmployees);
    }

    const apiDeleteEmployee = async (id) => {
        await EmployeesApi.deleteEmployeeById(id);

        // Retrieve refreshed list of employees from the server
        apiReadAllEmployees();
    }

    return (
        <Card color="white" className="shadow p-3 mb-5 rounded">
            <CardBody>
                <CardTitle tag="h3"><FaUserTie />List of employees</CardTitle>
                <div className="card-action">
                    <Button color="secondary" onClick={apiReadAllEmployees}><FaSyncAlt /></Button> {' '}
                    <CreateEmployeeModal onCreated={apiReadAllEmployees} />
                </div>
                <CardText tag="div">
                    {employees.length > 0 ?
                        <EmployeesTable>
                            {employees.map(employee => <EmployeeRow employee={employee} readAllEmployees={apiReadAllEmployees} deleteEmployee={apiDeleteEmployee} />)}
                        </EmployeesTable> :
                        <NoEmployeesText />
                    }
                </CardText>
            </CardBody>
        </Card>
    );
}

const EmployeeRow = (props) => {
    return (
        <tr key={props.employee.id}>
            <th scope="row">{props.employee.id}</th>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.dateOfBirth}</td>
            <td>{props.employee.companyId}</td>
            <td className="table-buttons">
                <EditEmployeeModal
                    id={props.employee.id}
                    onEdited={props.readAllEmployees} />
                <DeleteButton
                    title="Delete employee"
                    text="Are you sure you want to delete this employee?"
                    id={props.employee.id}
                    onYes={props.deleteEmployee} />
            </td>
        </tr>
    );
}

const EmployeesTable = (props) => {
    return (
        <Table dark striped>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col">Company ID</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </Table>
    )
};

const NoEmployeesText = () => {
    return (
        <p>No employees yet, use button above to add one!</p>       
    )
}

export default EmployeeListPage;
