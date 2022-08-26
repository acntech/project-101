import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CompaniesApi from '../services/CompaniesApi';

const CreateCompanyModal = (props) => {
    const [orgNr, setOrgNr] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOrgNrChange = (event) => {
        setOrgNr(event.currentTarget.value);
    };

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.currentTarget.value);
    }

    const toggle = () => {
        setIsModalOpen(currentIsModalOpen => !currentIsModalOpen);
    }

    const apiCreateCompany = async () => {
        const company = {
            orgNr: orgNr,
            companyName: companyName
        };

        if (company.companyName) {
            await CompaniesApi.createNewCompany(company);
        } else {
            await CompaniesApi.createNewCompanyByOrgnr(company.orgNr);
        }

        // Inform parent component that new company has been created, if onCreated() defined in props
        if (typeof this.props.onCreated === 'function') {
            props.onCreated();
        }

        toggle();
    }

    return (
        <>
            <Button color="primary" onClick={toggle}><FaPlus />New company</Button>
            <Modal isOpen={isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create new company</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="orgNr">Orgnr</Label>
                            <Input
                                type="text"
                                name="orgNr"
                                id="orgNr"
                                placeholder="Valid orgNr, 9 digits"
                                value={orgNr}
                                onChange={handleOrgNrChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="orgNr">Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                id="companyName"
                                placeholder="Fancy name of your company"
                                value={companyName}
                                onChange={handleCompanyNameChange} />
                            <FormText color="muted">
                                If you leave this field empty we will lookup company with orgNr in Brreg
                            </FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={apiCreateCompany}>Create</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CreateCompanyModal;
