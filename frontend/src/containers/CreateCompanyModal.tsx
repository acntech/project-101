import React, { Component } from 'react';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import CompaniesApi from '../services/CompaniesApi';

interface Props {
    onCreated?: () => void;
}

interface State {
    orgNr: string;
    companyName: string;
    modal: boolean;
}

class CreateCompanyModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            orgNr: '',
            companyName: '',
            modal: false
        };

        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleOrgNrChange = this.handleOrgNrChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.apiCreateCompany = this.apiCreateCompany.bind(this);
    }

    handleCompanyNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ companyName: event.target.value });
    }

    handleOrgNrChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ orgNr: event.target.value });
    }

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    }

    async apiCreateCompany() {
        const company = {
            orgNr: this.state.orgNr,
            companyName: this.state.companyName
        };

        if (company.companyName) {
            await CompaniesApi.createNewCompany(company);
        } else {
            await CompaniesApi.createNewCompanyByOrgnr(company.orgNr);
        }

        // Inform parent component that new company has been created, if onCreated() defined in props
        if (typeof this.props.onCreated === 'function') {
            this.props.onCreated();
        }

        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="primary" onClick={this.toggle}><FaPlus /> New company</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create new company</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="orgNr">Orgnr</Label>
                                <Input
                                    type="text"
                                    name="orgNr"
                                    id="orgNr"
                                    placeholder="Valid orgNr, 9 digits"
                                    value={this.state.orgNr}
                                    onChange={this.handleOrgNrChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="orgNr">Name</Label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    placeholder="Fancy name of your company"
                                    value={this.state.companyName}
                                    onChange={this.handleCompanyNameChange} />
                                <FormText color="muted">
                                    If you leave this field empty we will lookup company with orgNr in Brreg
                                </FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiCreateCompany}>Create</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export { CreateCompanyModal };
