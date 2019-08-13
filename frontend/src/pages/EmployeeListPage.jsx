import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, Table } from 'reactstrap';
import CreateEmployeeModal from '../containers/CreateEmployeeModal';
import DeleteButton from '../containers/DeleteButton';
import EditEmployeeModal from '../containers/EditEmployeeModal';
import { FaUserTie } from 'react-icons/fa';

class EmployeeListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };

        this.apiDeleteEmployee = this.apiDeleteEmployee.bind(this);
    }

    componentDidMount() {
        this.apiGetEmployees();
    }

    apiGetEmployees() {
        const employees = [
            {
                id: 1,
                firstName: 'Ismar',
                lastName: 'Slomic',
                dateOfBirth: '1984-05-07'
            },
            {
                id: 2,
                firstName: 'Ola',
                lastName: 'Nordmann',
                dateOfBirth: '1993-02-15'
            },
            {
                id: 3,
                firstName: 'Kari',
                lastName: 'Nordmann',
                dateOfBirth: '1990-12-24'
            }
        ];
        this.setState({ employees: employees });
    }

    apiDeleteEmployee(id) {
        console.log('Delete employee called, id: ' + id);
    }

    render() {
        const employees = this.state.employees;

        let employeeRows = [];
        employees.map((employee) => {
            return employeeRows.push(
                <tr key={employee.id}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.dateOfBirth}</td>
                    <td className="table-buttons">
                        <EditEmployeeModal id={employee.id} />
                        <DeleteButton
                            title="Delete employee"
                            text="Are you sure you want to delete this employee?"
                            id={employee.id}
                            onYes={this.apiDeleteEmployee} />
                    </td>
                </tr>
            );
        });

        const employeesTable = (
            <Table dark striped>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Date of birth</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeRows}
                </tbody>
            </Table>
        );

        const emptyTable = (
            <p>No employees yet, use button above to add one!</p>
        );

        return (
            <Card color="white" className="shadow p-3 mb-5 rounded">
                <CardBody>
                    <CardTitle tag="h3"><FaUserTie /> List of employees</CardTitle>
                    <div className="card-action">
                        <CreateEmployeeModal />
                    </div>
                    <CardText tag="div">
                        {employees.length > 0 ? employeesTable : emptyTable}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default EmployeeListPage;