import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import EmployeesApi from '../services/EmployeesApi';
import PropTypes from 'prop-types';
import CompaniesApi from '../services/CompaniesApi';

class EditEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            companyId: '',
            companies: [],
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.apiUpdateEmployee = this.apiUpdateEmployee.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [ name ]: value });
    }

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        // Only get data from server when the modal content is actually visible
        if (this.state.modal !== prevState.modal && this.state.modal) {
            this.apiReadEmployee(this.props.id);
            this.apiReadAllCompanies();
        }
    }

    async apiReadEmployee(id) {
        const employee = await EmployeesApi.readEmployeeById(id);
        this.setState({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                dateOfBirth: employee.dateOfBirth,
                companyId: employee.companyId
            }
        );
    }

    async apiReadAllCompanies() {
        const companies = await CompaniesApi.readAllCompanies();
        this.setState({ companies: companies });
    }

    async apiUpdateEmployee() {
        const employee = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            companyId: this.state.companyId
        };
        await EmployeesApi.updateEmployee(employee.id, employee);

        // Inform parent component that existing employee has been edited, if onEdited() defined in props
        if (typeof this.props.onEdited === 'function') {
            this.props.onEdited();
        }

        this.toggle();
    }

    render() {
        const companiesSelectOptions = this.state.companies.map((company) => {
            return (
                <option key={company.id} value={company.id}>{company.companyName}</option>
            );
        });
        return (
            <>
                <Button color="primary" onClick={this.toggle} size="sm"><FaEdit /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit {this.state.firstName} {this.state.lastName}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input
                                    type="number"
                                    name="id"
                                    id="id"
                                    value={this.state.id}
                                    disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstname">First name</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First name of the employee"
                                    value={this.state.firstName}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last name of the employee"
                                    value={this.state.lastName}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateOfBirth">Date of birth</Label>
                                <Input
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="companySelect">Company</Label>
                                <Input type="select" name="select" id="companySelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="companySelect">Company</Label>
                                <Input
                                    type="select"
                                    name="companyId"
                                    id="companySelect"
                                    onChange={this.handleChange}
                                    value={this.state.companyId}
                                >
                                    <option key="-1" value="">Select company</option>
                                    {companiesSelectOptions}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiUpdateEmployee} disabled={!this.state.companyId}>Save changes</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

EditEmployeeModal.propTypes = {
    id: PropTypes.number.isRequired,
    onEdited: PropTypes.func
};

export default EditEmployeeModal;
