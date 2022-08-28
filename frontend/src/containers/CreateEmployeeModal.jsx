import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CompaniesApi from '../services/CompaniesApi';
import EmployeesApi from '../services/EmployeesApi';
import { CompaniesSelectOptions } from '../components/CompaniesSelectOptions';

const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    companyId: ''
};

const CreateEmployeeModal = (props) => {
    const [companies, setCompanies] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    const [employee, setEmployee] = React.useState(initialValues);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployee(currentEmployee => ({
            ...currentEmployee,
            [name]: value
        }))
    }

    const setInitialValues = () => {
        setEmployee(initialValues);
    }

    const toggle = () => {
        setInitialValues();
        setIsModalOpen(currentIsModalOpen => !currentIsModalOpen);
    }

    React.useEffect(() => {
        apiReadAllCompanies();
    }, []);

    const apiCreateEmployee = async () => {
        await EmployeesApi.createNewEmployee(employee);

        // Inform parent component that new employee has been created, if onCreated() defined in props
        if (typeof props.onCreated === 'function') {
            props.onCreated();
        }

        toggle();
    }

    const apiReadAllCompanies = async () => {
        const companies = await CompaniesApi.readAllCompanies();
        setCompanies(companies);
    };

    return (
        <>
            <Button color="primary" onClick={toggle}><FaPlus />New employee</Button>
            <Modal isOpen={isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create new employee</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="firstname">First name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First name of the employee"
                                value={employee.firstName}
                                onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last name of the employee"
                                value={employee.lastName}
                                onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateOfBirth">Date of birth</Label>
                            <Input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={employee.dateOfBirth}
                                onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="companySelect">Company</Label>
                            <CompaniesSelectOptions companies={companies} handleChange={handleChange}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={apiCreateEmployee} disabled={!employee.companyId}>Create</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default CreateEmployeeModal;
