import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CompaniesApi from '../services/CompaniesApi';

const EditCompanyModal = (props) => {

    const [company, setCompany] = React.useState({
        id: '',
        orgNr: '',
        companyName: ''
    });
    const [isModalOpen, setIsModalOpen] = React.useState('');
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCompany(currentCompany => ({
            ...currentCompany,
            [name]: value
        }));
    };

    const toggle = () => {
        setIsModalOpen(currentIsModalOpen => !currentIsModalOpen);
    }

    React.useEffect(() => {
        if (isModalOpen) {
            apiReadCompany(props.id);
        }
    }, [isModalOpen, props.id]);

    const apiReadCompany = async (id) => {
        const existingCompany = await CompaniesApi.readCompanyById(id);
        setCompany(existingCompany);
    };

    const apiUpdateCompany = async () => {
        await CompaniesApi.updateCompany(company.id, company);

        // Inform parent component that existing company has been edited, if onEdited() defined in props
        if (typeof props.onEdited === 'function') {
            props.onEdited();
        }

        toggle();
    }

    return (
        <>
            <Button color="primary" onClick={toggle} size="sm"><FaEdit /></Button>
            <Modal isOpen={isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit {company.companyName}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="id">Id</Label>
                            <Input
                                type="number"
                                name="id"
                                id="id"
                                value={company.id}
                                disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="orgNr">Orgnr</Label>
                            <Input
                                type="text"
                                name="orgNr"
                                id="orgNr"
                                placeholder="Valid orgNr, 9 digits"
                                value={company.orgNr}
                                onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="companyName">Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                id="companyName"
                                placeholder="Fancy name of your company"
                                value={company.companyName}
                                onChange={handleChange} />
                            <FormText color="muted">
                                If you leave this field empty we will lookup company with orgNr in Brreg
                            </FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={apiUpdateCompany}>Save changes</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default EditCompanyModal;
