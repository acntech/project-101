import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CompaniesApi from '../services/CompaniesApi';
import EmployeesApi from '../services/EmployeesApi';
import { CompaniesSelectOptions } from '../components/CompaniesSelectOptions';

const EditEmployeeModal = (props) => {
    const [employee, setEmployee] = React.useState({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        companyId: ''
    });
    const [companies, setCompanies] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployee(currentEmployee => ({
            ...currentEmployee,
            [name]: value
        }));
    };

    const toggle = () => {
        setIsModalOpen(currentIsModalOpen => !currentIsModalOpen);
    }

    React.useEffect(() => {
        if (isModalOpen) {
            apiReadEmployee(props.id);
            apiReadAllCompanies();
        }
    }, [isModalOpen, props.id]);

    const apiReadEmployee = async (id) => {
        const existingEmployee = await EmployeesApi.readEmployeeById(id);

        setEmployee(existingEmployee);
    }

    const apiReadAllCompanies = async () => {
        const allCompanies = await CompaniesApi.readAllCompanies();
        setCompanies(allCompanies);
    }

    const apiUpdateEmployee = async () => {
        await EmployeesApi.updateEmployee(employee.id, employee);

        // Inform parent component that existing employee has been edited, if onEdited() defined in props
        if (typeof props.onEdited === 'function') {
            props.onEdited();
        }

        toggle();
    }

    return (
        <>
            <Button color="primary" onClick={toggle} size="sm"><FaEdit /></Button>
            <Modal isOpen={isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit {employee.firstName} {employee.lastName}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input
                                type="number"
                                name="id"
                                id="id"
                                value={employee.id}
                                disabled />
                        </FormGroup>
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
                            <CompaniesSelectOptions defaultCompanyId={employee.companyId} companies={companies} handleChange={handleChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={apiUpdateEmployee} disabled={!employee.companyId}>Save changes</Button>
                </ModalFooter>
            </Modal>
        </>
    );
    
}

export default EditEmployeeModal;
