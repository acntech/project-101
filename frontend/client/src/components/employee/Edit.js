import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Edit extends Component {

    constructor(props) {
        super(props)
        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeeRollno = this.onChangeEmployeeRollno.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            name: '',
            email: '',
            rollNo: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/employees/edit-employee/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    rollNo: res.data.rollNo
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeEmployeeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmployeeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeEmployeeRollno(e) {
        this.setState({ rollNo: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const EmployeeObject = {
            name: this.state.name,
            email: this.state.email,
            rollNo: this.state.rollNo
        };

        axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, EmployeeObject)
            .then((res) => {
                console.log(res.data)
                console.log('Employee successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Employee List
        this.props.history.push('/employees')
    }


    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeEmployeeName} />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmployeeEmail} />
                </Form.Group>

                <Form.Group controlId="Name">
                    <Form.Label>Roll No</Form.Label>
                    <Form.Control type="text" value={this.state.rollNo} onChange={this.onChangeEmployeeRollno} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Employee
                </Button>
            </Form>
        </div>);
    }
}