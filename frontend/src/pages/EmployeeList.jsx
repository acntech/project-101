import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
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
                        <button type="button" className="btn btn-primary">View</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h3 className="card-title">List of employees</h3>
                    <div className="card-action">
                        <Link to="/employees/create" className="btn btn-primary">Create new</Link>
                    </div>
                    <div className="card-text">
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
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
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeList;