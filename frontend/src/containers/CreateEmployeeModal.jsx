import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import EmployeesApi from '../services/EmployeesApi';
import PropTypes from 'prop-types';
import CompaniesApi from '../services/CompaniesApi';

class CreateEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            companyId: '',
            companies: [],
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.apiCreateEmployee = this.apiCreateEmployee.bind(this);
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

    componentDidMount() {
        this.apiReadAllCompanies();
    }

    async apiCreateEmployee() {
        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            companyId: this.state.companyId
        };
        await EmployeesApi.createNewEmployee(employee);

        // Inform parent component that new employee has been created, if onCreated() defined in props
        if (typeof this.props.onCreated === 'function') {
            this.props.onCreated();
        }

        this.toggle();
    }

    async apiReadAllCompanies() {
        const companies = await CompaniesApi.readAllCompanies();
        this.setState({ companies: companies });
    }

    render() {
        const companiesSelectOptions = this.state.companies.map((company) => {
            return (
                <option key={company.id} value={company.id}>{company.companyName}</option>
            );
        });
        return (
            <>
                <Button color="primary" onClick={this.toggle}><FaPlus /> New employee</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create new employee</ModalHeader>
                    <ModalBody>
                        <Form>
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
                                <Input
                                    type="select"
                                    name="companyId"
                                    id="companySelect"
                                    onChange={this.handleChange}
                                >
                                    <option key="-1" value="">Select company</option>
                                    {companiesSelectOptions}
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiCreateEmployee} disabled={!this.state.companyId}>Create</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

CreateEmployeeModal.propTypes = {
    onCreated: PropTypes.func
};

export default CreateEmployeeModal;
