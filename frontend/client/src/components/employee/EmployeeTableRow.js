import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class EmployeeTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee() {
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
            .then((res) => {
                console.log('Employee successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollNo}</td>
                <td> Edit n delete
                   {/* <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteEmployee} size="sm" variant="danger">Delete</Button>*/}
                </td>
            </tr>
        );
    }
}