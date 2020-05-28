import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class AddEmployee extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeeRollNo = this.onChangeEmployeeRollNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            email: '',
            rollNo: '',
        }
    }

    onChangeEmployeeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmployeeEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeEmployeeRollNo(e) {
        this.setState({ rollNo: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        const employeeObject = {
            name: this.state.name,
            email: this.state.email,
            rollNo: this.state.rollNo,
        };
        axios.post('http://localhost:4000/employees/create-employee', employeeObject)
            .then(res => console.log(res.data));

        this.setState({ name: '', email: '' })
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit} className='md-10'>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeEmployeeName} />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmployeeEmail} />
                </Form.Group>

                <Form.Group controlId="RollNo">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="rollNo" value={this.state.rollNo} onChange={this.onChangeEmployeeRollNo} />
                </Form.Group>


                <Button variant="danger" size="lg" block="block" type="submit">
                    Add employee
                </Button>
            </Form>
        </div>);
    }
}