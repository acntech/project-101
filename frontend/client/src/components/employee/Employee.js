import React, {Component} from "react";
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import EmployeeTableRow from './EmployeeTableRow';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {FaPlus} from "react-icons/fa";
import History from "../History";


export default class Employee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employee: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/employees')
            .then(res => {
                this.setState({
                    employee: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.employee.map((res, i) => {
            return <EmployeeTableRow obj={res} key={i}/>;
        });
    }




    render() {
        return (
            <Container className='mt-5'>
                <Row>
                    <Button variant="btn btn-success" onClick={() => History.push('/add-employee')}>
                        <FaPlus/> Add Employees
                    </Button>
                </Row>

                <div className="table-wrapper mt-5">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll No</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.DataTable()}
                        </tbody>
                    </Table>
                </div>
            </Container>);
    }
}